export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const { searchParams } = new URL(request.url);

  // 1. Setup metadata from the URL
  const billingRequestId = searchParams.get('billing_request_id');
  const amount = searchParams.get('amt');
  const team = searchParams.get('tn');
  const parentId = searchParams.get('pid');
  
  const baseUrl = 'https://api-sandbox.gocardless.com';

  if (!billingRequestId) return new Response("Missing ID", { status: 400 });

  try {
    let br;
    // RETRY LOOP: Try 3 times to fetch the request in case of 404 latency
    for (let i = 0; i < 3; i++) {
      const res = await fetch(`${baseUrl}/billing_requests/${billingRequestId}`, {
        headers: {
          'Authorization': `Bearer ${env.GC_ACCESS_TOKEN}`,
          'GoCardless-Version': '2015-07-06'
        }
      });
      
      if (res.ok) {
        const data: any = await res.json();
        br = data.billing_requests;
        break;
      }
      // Wait 1 second before retrying
      await new Promise(r => setTimeout(r, 1000));
    }

    if (!br) throw new Error("Billing Request not found after retries.");

    // 2. Validate it's ready
    if (br.status !== 'fulfilled' || !br.links?.mandate) {
      return new Response(`Mandate not ready. Current status: ${br.status}`, { status: 400 });
    }

    // 3. Create the actual Subscription
    const subRes = await fetch(`${baseUrl}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.GC_ACCESS_TOKEN}`,
        'GoCardless-Version': '2015-07-06',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriptions: {
          amount: amount,
          currency: "GBP",
          name: `${team} Monthly Subs`,
          interval_unit: "monthly",
          links: { mandate: br.links.mandate },
          metadata: { parent_id: parentId, team: team }
        }
      })
    });

    if (!subRes.ok) throw new Error("Failed to create subscription record.");

    // 4. Send them to your final confirmation page
    const host = request.headers.get('x-forwarded-host') || new URL(request.url).host;
    return Response.redirect(`https://${host}/confirmation`, 302);

  } catch (err: any) {
    return new Response(err.message, { status: 500 });
  }
};
