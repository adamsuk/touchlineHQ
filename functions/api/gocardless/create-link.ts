import type { Env, GCBillingRequest, GCBillingRequestFlow, CreateLinkBody } from './_types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: CreateLinkBody;
  try {
    body = await request.json<CreateLinkBody>();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { team, fan, paymentType, amountInPence, intervalUnit, description } = body;

  if (!team || !fan || !paymentType || !amountInPence || amountInPence <= 0) {
    return json({ error: 'Missing or invalid required fields' }, 400);
  }

  const reference = `${team.replace(/\s+/g, '').toUpperCase()}-${fan}-${paymentType}`;

  const gcBase =
    env.GC_ENVIRONMENT === 'live'
      ? 'https://api.gocardless.com'
      : 'https://api-sandbox.gocardless.com';

  const gcHeaders = {
    Authorization: `Bearer ${env.GC_ACCESS_TOKEN}`,
    'GoCardless-Version': '2015-07-06',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // Create the billing request (mandate only — subscription created after redirect)
  const brRes = await fetch(`${gcBase}/billing_requests`, {
    method: 'POST',
    headers: gcHeaders,
    body: JSON.stringify({
      billing_requests: {
        mandate_request: {
          scheme: 'bacs',
          description: description || `${paymentType} payment - FAN ${fan}`,
        },
        metadata: {
          team,
          fan,
          payment_type: paymentType,
          reference,
          amount_in_pence: String(amountInPence),
          interval_unit: intervalUnit || 'monthly',
        },
      },
    }),
  });

  if (!brRes.ok) {
    const detail = await brRes.text();
    return json({ error: 'Failed to create billing request', detail }, 502);
  }

  const { billing_requests: br } = await brRes.json<{ billing_requests: GCBillingRequest }>();

  // Build redirect_uri carrying subscription params so confirm.ts can create
  // the subscription without a database or KV store
  const origin = new URL(request.url).origin;
  const confirmParams = new URLSearchParams({
    reference,
    amount: String(amountInPence),
    interval_unit: intervalUnit || 'monthly',
    description: description || `${paymentType} payment - FAN ${fan}`,
  });
  const redirectUri = `${origin}/api/gocardless/confirm?${confirmParams.toString()}`;
  const exitUri = `${origin}/#/payment-cancelled`;

  // Create the billing request flow to get the hosted payment URL
  const flowRes = await fetch(`${gcBase}/billing_request_flows`, {
    method: 'POST',
    headers: gcHeaders,
    body: JSON.stringify({
      billing_request_flows: {
        redirect_uri: redirectUri,
        exit_uri: exitUri,
        links: {
          billing_request: br.id,
        },
      },
    }),
  });

  if (!flowRes.ok) {
    const detail = await flowRes.text();
    return json({ error: 'Failed to create billing request flow', detail }, 502);
  }

  const { billing_request_flows: flow } = await flowRes.json<{
    billing_request_flows: GCBillingRequestFlow;
  }>();

  return json(
    {
      authorisation_url: flow.authorisation_url,
      reference,
      billing_request_id: br.id,
    },
    200
  );
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
