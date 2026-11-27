(function () {
    const popupConfigs = [
        {
            id: 'special-lecture',
            url: 'popup/special-lecture_261208/index.html',
            name: 'jbnuSpecialLecturePopup',
            storageKey: 'jbnuSpecialLecture261208HiddenUntil',
            startAt: '2026-11-27T00:00:00+09:00',
            endAt: '2026-12-08T23:59:59.999+09:00',
            title: '전북대학교 석좌교수 특별강연 안내',
            titleEn: 'JBNU Distinguished Professor Special Lecture: Andrew Philip Hunter',
            mobilePriority: 1,
            width: 600,
            height: 946,
            posterAspectRatio: 1084 / 1451,
            controlsHeight: 148,
            borderWidth: 4
        },
        {
            id: 'employment-interview2',
            url: 'popup/employment-interview2_261201/index.html',
            name: 'jbnuEmploymentInterview2Popup',
            storageKey: 'jbnuEmploymentInterview2_261201HiddenUntil',
            startAt: '2026-11-27T00:00:00+09:00',
            endAt: '2026-12-01T23:59:59.999+09:00',
            title: '방산기업 사전면접 2차 신청 안내',
            titleEn: 'Defense Industry Preliminary Interviews: Round 2',
            mobilePriority: 2,
            width: 560,
            height: 720,
            autoHeight: true
        }
    ];

    function getPopupSize(config, availableWidth, availableHeight) {
        const maxWidth = Math.max(1, Math.floor(Math.min(config.width, availableWidth)));
        const maxHeight = Math.max(1, Math.floor(Math.min(config.height, availableHeight)));
        if (!config.posterAspectRatio || maxHeight <= config.controlsHeight + 1) {
            return { width: maxWidth, height: maxHeight };
        }
        const width = Math.floor(Math.min(
            maxWidth,
            (maxHeight - config.controlsHeight) * config.posterAspectRatio + config.borderWidth
        ));
        return {
            width,
            height: Math.ceil((width - config.borderWidth) / config.posterAspectRatio + config.controlsHeight)
        };
    }

    function shouldHidePopup(config) {
        const now = Date.now();
        if (now < new Date(config.startAt).getTime() || now > new Date(config.endAt).getTime()) {
            return true;
        }
        const hiddenUntil = localStorage.getItem(config.storageKey);
        if (hiddenUntil === 'forever') {
            return true;
        }
        const hiddenUntilTime = Number(hiddenUntil);
        return Boolean(hiddenUntil) && Number.isFinite(hiddenUntilTime) && now < hiddenUntilTime;
    }

    function openLayerPopups(configs) {
        const overlay = document.createElement('div');
        const frames = new Map();
        const mobileLayout = window.innerWidth < 900;
        const english = localStorage.getItem('jbnu-defense-language') === 'en';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', english ? 'Homepage Announcements' : '홈페이지 주요 안내');
        Object.assign(overlay.style, {
            position: 'fixed', inset: '0', zIndex: '10000', display: 'flex',
            alignItems: 'safe center', justifyContent: 'center', alignContent: 'safe center',
            flexWrap: 'wrap', gap: '20px', padding: '18px', overflowY: 'auto',
            background: 'rgba(0, 0, 0, 0.58)'
        });
        if (mobileLayout) {
            Object.assign(overlay.style, {
                display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)',
                justifyItems: 'center', alignContent: 'center'
            });
        }

        function topLayer() {
            const entries = Array.from(frames.entries());
            if (mobileLayout) {
                entries.sort((a, b) => a[1].config.mobilePriority - b[1].config.mobilePriority);
            }
            return entries.pop();
        }

        function updateLayerVisibility() {
            const top = topLayer();
            for (const [id, entry] of frames) {
                entry.frameWrap.hidden = mobileLayout && id !== top?.[0];
            }
            top?.[1].closeButton.focus();
        }

        function removeOverlay() {
            overlay.remove();
            document.removeEventListener('keydown', handleEscape);
            window.removeEventListener('message', handlePopupMessage);
        }

        function closeLayer(id) {
            const entry = frames.get(id);
            if (!entry) return;
            entry.frameWrap.remove();
            frames.delete(id);
            if (frames.size === 0) {
                removeOverlay();
            } else {
                updateLayerVisibility();
            }
        }

        function handleEscape(event) {
            if (event.key === 'Escape') {
                closeLayer(topLayer()?.[0]);
            }
        }

        function handlePopupMessage(event) {
            const isSameOrigin = event.origin === window.location.origin || event.origin === 'null';
            if (!isSameOrigin) return;
            for (const [id, entry] of frames) {
                if (event.source === entry.iframe.contentWindow) {
                    if (event.data?.type === 'jbnu-main-popup-close') {
                        closeLayer(id);
                    } else if (event.data?.type === 'jbnu-main-popup-size' && entry.config.autoHeight
                        && typeof event.data.height === 'number' && Number.isFinite(event.data.height)) {
                        const height = Math.min(Math.max(180, Math.ceil(event.data.height)), Math.max(1, window.innerHeight - 36));
                        entry.frameWrap.style.height = `${height}px`;
                    }
                    break;
                }
            }
        }

        configs.forEach(config => {
            const size = getPopupSize(config, window.innerWidth - 36, window.innerHeight - 36);
            const frameWrap = document.createElement('div');
            const closeButton = document.createElement('button');
            const iframe = document.createElement('iframe');
            Object.assign(frameWrap.style, {
                position: 'relative', flexShrink: '0', width: `min(${size.width}px, 100%)`,
                height: `min(${size.height}px, calc(100dvh - 36px))`,
                background: '#101624', boxShadow: '0 24px 60px rgba(0, 0, 0, 0.34)'
            });
            if (mobileLayout) {
                frameWrap.style.gridArea = '1 / 1';
                frameWrap.style.zIndex = String(config.mobilePriority);
            }
            closeButton.type = 'button';
            closeButton.textContent = 'X';
            closeButton.setAttribute('aria-label', english ? `Close: ${config.titleEn}` : `${config.title} 닫기`);
            Object.assign(closeButton.style, {
                position: 'absolute', top: '0', right: '0', zIndex: '1',
                width: '42px', height: '42px', border: '0',
                background: 'rgba(16, 22, 36, 0.92)', color: '#fff',
                fontWeight: '700', cursor: 'pointer'
            });
            iframe.src = config.url;
            iframe.title = english ? config.titleEn : config.title;
            Object.assign(iframe.style, { display: 'block', width: '100%', height: '100%', border: '0' });
            closeButton.addEventListener('click', () => closeLayer(config.id));
            frameWrap.append(closeButton, iframe);
            overlay.appendChild(frameWrap);
            frames.set(config.id, { config, frameWrap, iframe, closeButton });
        });

        overlay.addEventListener('click', event => {
            if (event.target === overlay) removeOverlay();
        });
        document.addEventListener('keydown', handleEscape);
        window.addEventListener('message', handlePopupMessage);
        document.body.appendChild(overlay);
        updateLayerVisibility();
    }

    function openMainPopups() {
        const activeConfigs = popupConfigs.filter(config => !shouldHidePopup(config));
        if (activeConfigs.length === 0) return;

        if (window.innerWidth < 900) {
            openLayerPopups(activeConfigs);
            return;
        }

        const sizes = activeConfigs.map(config => getPopupSize(
            config,
            (window.screen.availWidth || 1920) - 36,
            (window.screen.availHeight || 1080) - 100
        ));
        const gap = 20;
        const totalWidth = sizes.reduce((sum, size) => sum + size.width, 0) + gap * (sizes.length - 1);
        let left = Math.max(0, Math.round(window.screenX + (window.outerWidth - totalWidth) / 2));
        const blockedConfigs = [];
        activeConfigs.forEach((config, index) => {
            const size = sizes[index];
            const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - size.height) / 2));
            const features = [
                `width=${size.width}`, `height=${size.height}`, `left=${left}`, `top=${top}`,
                'resizable=yes', 'scrollbars=no'
            ].join(',');
            const popup = window.open(config.url, config.name, features);
            if (!popup || popup.closed || typeof popup.closed === 'undefined') {
                blockedConfigs.push(config);
            } else {
                popup.focus();
            }
            left += size.width + gap;
        });
        if (blockedConfigs.length > 0) openLayerPopups(blockedConfigs);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', openMainPopups);
    } else {
        openMainPopups();
    }
})();
