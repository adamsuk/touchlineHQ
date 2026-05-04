export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const { searchParams } = new URL(request.url);

  const teamName = searchParams.get('team') || 'General';
  const subAmount = searchParams.get('amount') || '2500';
  const baseUrl = 'https://api-sandbox.gocardless.com';
  
  try {
    // 1. Create a Redirect Flow
    // This is the ONLY way in Sandbox to show the description/price
    // without triggering that 'consent_type' error.
    const response = await fetch(`${baseUrl}/redirect_flows`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.GC_ACCESS_TOKEN}`,
        'GoCardless-Version': '2015-07-06',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        redirect_flows: {
          // This description is visible to the parent on the bank page
          description: `${teamName} Monthly Subs - £${(parseInt(subAmount)/100).toFixed(2)}`,
          session_token: `session_${Date.now()}`, 
          success_redirect_url: 'https://touchlinehq.co.uk',
          prefilled_customer: {
            email: searchParams.get('email') || ""
          }
        }
      })
    });

    const data: any = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Flow Failed');

    return new Response(JSON.stringify({ 
      url: data.redirect_flows.redirect_url 
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
