import type { Env, GCBillingRequest, GCSubscription } from './_types';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const origin = url.origin;

  // GoCardless appends billing_request_id to the redirect_uri we specified
  const billingRequestId = url.searchParams.get('billing_request_id');
  const reference = url.searchParams.get('reference');
  const amountStr = url.searchParams.get('amount');
  const intervalUnit = url.searchParams.get('interval_unit') as
    | 'monthly'
    | 'weekly'
    | 'yearly'
    | null;
  const description = url.searchParams.get('description');

  if (!billingRequestId || !reference || !amountStr) {
    return Response.redirect(`${origin}/payment-cancelled?reason=missing_params`, 302);
  }

  const amountInPence = parseInt(amountStr, 10);
  if (isNaN(amountInPence) || amountInPence <= 0) {
    return Response.redirect(`${origin}/payment-cancelled?reason=invalid_amount`, 302);
  }

  const gcBase =
    env.GC_ENVIRONMENT === 'live'
      ? 'https://api.gocardless.com'
      : 'https://api-sandbox.gocardless.com';

  const gcHeaders = {
    Authorization: `Bearer ${env.GC_ACCESS_TOKEN}`,
    'GoCardless-Version': '2015-07-06',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  // Fetch the billing request to confirm it was fulfilled and get the mandate ID
  const brRes = await fetch(`${gcBase}/billing_requests/${billingRequestId}`, {
    headers: gcHeaders,
  });

  if (!brRes.ok) {
    return Response.redirect(`${origin}/payment-cancelled?reason=fetch_failed`, 302);
  }

  const { billing_requests: br } = await brRes.json<{ billing_requests: GCBillingRequest }>();

  const mandateId = br.links?.mandate;
  if (!mandateId || br.status !== 'fulfilled') {
    return Response.redirect(`${origin}/payment-cancelled?reason=not_fulfilled`, 302);
  }

  // Create the subscription against the mandate
  const subRes = await fetch(`${gcBase}/subscriptions`, {
    method: 'POST',
    headers: gcHeaders,
    body: JSON.stringify({
      subscriptions: {
        amount: amountInPence,
        currency: 'GBP',
        interval_unit: intervalUnit || 'monthly',
        interval: 1,
        name: description || reference,
        payment_reference: reference,
        metadata: { reference, customer_ref: reference },
        links: { mandate: mandateId },
      },
    }),
  });

  if (!subRes.ok) {
    // Mandate is created but subscription failed — redirect to success with warning.
    // The mandate still exists and can be used to manually create a subscription
    // in the GoCardless dashboard.
    console.error('Subscription creation failed:', await subRes.text());
    return Response.redirect(
      `${origin}/payment-success?mandate=${mandateId}&warning=subscription_failed&ref=${encodeURIComponent(reference)}`,
      302
    );
  }

  const { subscriptions: sub } = await subRes.json<{ subscriptions: GCSubscription }>();

  return Response.redirect(
    `${origin}/payment-success?mandate=${mandateId}&subscription=${sub.id}&ref=${encodeURIComponent(reference)}`,
    302
  );
};
