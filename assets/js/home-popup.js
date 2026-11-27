(function () {
    const popupEnabled = true;
    const popupUrl = 'popup/special-lecture_261208/index.html';
    const popupName = 'jbnuSpecialLecturePopup';
    const storageKey = 'jbnuSpecialLecture261208HiddenUntil';
    const foreverValue = 'forever';
    const displayStartAt = new Date('2026-11-27T00:00:00+09:00').getTime();
    const displayEndAt = new Date('2026-12-08T23:59:59.999+09:00').getTime();
    const width = 600;
    const height = 946;
    const posterAspectRatio = 1084 / 1451;
    // Header (48), notice link (52), footer (44), and outer borders (4).
    const controlsHeight = 148;
    const borderWidth = 4;

    function getPopupSize(availableWidth, availableHeight) {
        const maxHeight = Math.min(height, availableHeight);
        const fittedWidth = Math.floor(Math.min(
            width,
            availableWidth,
            Math.max(borderWidth + 1, (maxHeight - controlsHeight) * posterAspectRatio + borderWidth)
        ));
        return {
            width: fittedWidth,
            height: Math.ceil((fittedWidth - borderWidth) / posterAspectRatio + controlsHeight)
        };
    }

    function shouldHidePopup() {
        const now = Date.now();

        if (now < displayStartAt || now > displayEndAt) {
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
        const size = getPopupSize(window.innerWidth - 36, window.innerHeight - 36);
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
        frameWrap.style.width = `min(${size.width}px, 100%)`;
        frameWrap.style.height = `min(${size.height}px, calc(100dvh - 36px))`;
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
        iframe.title = localStorage.getItem('jbnu-defense-language') === 'en'
            ? 'JBNU Distinguished Professor Special Lecture: Andrew Philip Hunter'
            : '전북대학교 석좌교수 특별강연 안내';
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
        if (!popupEnabled || shouldHidePopup()) {
            return;
        }

        const size = getPopupSize(
            (window.screen.availWidth || width + 36) - 36,
            (window.screen.availHeight || height + 100) - 100
        );
        const popupWidth = size.width;
        const popupHeight = size.height;
        const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - popupWidth) / 2));
        const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - popupHeight) / 2));
        const features = [
            `width=${popupWidth}`,
            `height=${popupHeight}`,
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
