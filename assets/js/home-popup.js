(function () {
    const popupUrl = 'popup/%EA%B5%AD%EB%B0%A9%EC%82%B0%EC%97%85%EA%B4%80%EB%A6%AC%EC%82%AC%20260520/index.html';
    const popupName = 'jbnuKDefenseMainPopup';
    const storageKey = 'jbnuKDefenseMainPopupHiddenUntil';
    const foreverValue = 'forever';
    const displayEndAt = new Date('2026-06-20T23:59:59+09:00').getTime();
    const width = 560;
    const height = 740;

    function shouldHidePopup() {
        if (Date.now() > displayEndAt) {
            return true;
        }

        const hiddenUntil = localStorage.getItem(storageKey);

        if (!hiddenUntil) {
            return false;
        }

        if (hiddenUntil === foreverValue) {
            return true;
        }

        const hiddenUntilTime = Number(hiddenUntil);
        return Number.isFinite(hiddenUntilTime) && Date.now() < hiddenUntilTime;
    }

    function openLayerPopup() {
        const overlay = document.createElement('div');
        const frameWrap = document.createElement('div');
        const closeButton = document.createElement('button');
        const iframe = document.createElement('iframe');

        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.zIndex = '10000';
        overlay.style.display = 'grid';
        overlay.style.placeItems = 'center';
        overlay.style.padding = '18px';
        overlay.style.background = 'rgba(0, 0, 0, 0.58)';

        frameWrap.style.position = 'relative';
        frameWrap.style.width = `min(${width}px, 100%)`;
        frameWrap.style.height = `min(${height}px, calc(100vh - 36px))`;
        frameWrap.style.background = '#101624';
        frameWrap.style.boxShadow = '0 24px 60px rgba(0, 0, 0, 0.34)';

        closeButton.type = 'button';
        closeButton.textContent = 'X';
        closeButton.setAttribute('aria-label', 'Close popup');
        closeButton.style.position = 'absolute';
        closeButton.style.top = '0';
        closeButton.style.right = '0';
        closeButton.style.zIndex = '1';
        closeButton.style.width = '42px';
        closeButton.style.height = '42px';
        closeButton.style.border = '0';
        closeButton.style.background = 'rgba(16, 22, 36, 0.92)';
        closeButton.style.color = '#fff';
        closeButton.style.fontWeight = '700';
        closeButton.style.cursor = 'pointer';

        iframe.src = popupUrl;
        iframe.title = 'Main notice popup';
        iframe.style.display = 'block';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';

        closeButton.addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', event => {
            if (event.target === overlay) {
                overlay.remove();
            }
        });
        document.addEventListener('keydown', function handleEscape(event) {
            if (event.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        });

        window.addEventListener('message', function handlePopupMessage(event) {
            const isSameOrigin = event.origin === window.location.origin || event.origin === 'null';

            if (!isSameOrigin || event.data?.type !== 'jbnu-main-popup-close') {
                return;
            }

            overlay.remove();
            window.removeEventListener('message', handlePopupMessage);
        });

        frameWrap.append(closeButton, iframe);
        overlay.appendChild(frameWrap);
        document.body.appendChild(overlay);
    }

    function openMainPopup() {
        if (shouldHidePopup()) {
            return;
        }

        const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - width) / 2));
        const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2));
        const features = [
            `width=${width}`,
            `height=${height}`,
            `left=${left}`,
            `top=${top}`,
            'resizable=yes',
            'scrollbars=no'
        ].join(',');

        const popup = window.open(popupUrl, popupName, features);

        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
            openLayerPopup();
        } else {
            popup.focus();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', openMainPopup);
    } else {
        openMainPopup();
    }
})();
