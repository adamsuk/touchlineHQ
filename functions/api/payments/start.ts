export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const { searchParams } = new URL(request.url);

  const host = request.headers.get('x-forwarded-host') || new URL(request.url).host;
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const publicOrigin = `${protocol}://${host}`;

  const teamName = searchParams.get('team') || 'General';
  const subAmount = searchParams.get('amount') || '2500';
  const parentId = searchParams.get('parent_id') || 'QR_USER'; // Your custom metadata
  
  const baseUrl = 'https://api-sandbox.gocardless.com';
  
  const successUrl = new URL(`${publicOrigin}/api/payments/success`);
  successUrl.searchParams.set('amt', subAmount);
  successUrl.searchParams.set('tn', teamName);
  successUrl.searchParams.set('pid', parentId);

  try {
    const brResponse = await fetch(`${baseUrl}/billing_requests`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.GC_ACCESS_TOKEN}`,
        'GoCardless-Version': '2015-07-06',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        billing_requests: {
          mandate_request: { scheme: "bacs" },
          metadata: {
            parent_id: parentId, // Metadata on the Billing Request
            team: teamName
          }
        }
      })
    });

    const brData: any = await brResponse.json();
    if (!brResponse.ok) throw new Error(brData.error?.message || 'BR Failed');

    const flowResponse = await fetch(`${baseUrl}/billing_request_flows`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.GC_ACCESS_TOKEN}`,
        'GoCardless-Version': '2015-07-06',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        billing_request_flows: {
          redirect_uri: successUrl.toString(),
          links: { billing_request: brData.billing_requests.id }
        }
      })
    });

    const flowData: any = await flowResponse.json();
    return new Response(JSON.stringify({ url: flowData.billing_request_flows.authorisation_url }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
