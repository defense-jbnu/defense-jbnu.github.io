const postElement = document.getElementById('notice-post');
const repoRoot = '../..';

function escapeHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function resolveAssetPath(path = '') {
    if (!path) {
        return '';
    }

    if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
        return path;
    }

    return `${repoRoot}/${path.replace(/^\/+/, '')}`;
}

function renderParagraphs(content) {
    const paragraphs = Array.isArray(content) ? content : [content].filter(Boolean);

    return paragraphs
        .map(paragraph => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
        .join('');
}

function renderDetails(details) {
    if (!details) {
        return '';
    }

    const entries = Array.isArray(details)
        ? details
        : Object.entries(details).map(([label, value]) => ({ label, value }));

    if (entries.length === 0) {
        return '';
    }

    return `
        <div class="community-post-details">
            <strong>[주요 내용]</strong>
            <ul>
                ${entries.map(item => `
                    <li>
                        <span>${escapeHtml(item.label)}:</span>
                        ${escapeHtml(item.value)}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

function renderExternalLink(post) {
    const href = post.url || (/^https?:\/\//.test(post.link || '') ? post.link : '');

    if (!href) {
        return '';
    }

    return `
        <a class="community-post-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">
            관련 링크 바로가기
        </a>
    `;
}

function renderPost(post) {
    const image = post.image ? `
        <figure class="community-post-image">
            <img src="${escapeHtml(resolveAssetPath(post.image))}" alt="${escapeHtml(post.imageAlt || post.title || '공지 이미지')}">
        </figure>
    ` : '';

    postElement.innerHTML = `
        <header class="community-post-header">
            <h3>${escapeHtml(post.title)}</h3>
            <div class="community-post-meta">
                <span><strong>작성일:</strong> ${escapeHtml(post.date || '')}</span>
                ${post.author ? `<span><strong>작성자:</strong> ${escapeHtml(post.author)}</span>` : ''}
            </div>
        </header>

        <div class="community-post-body">
            ${image}
            ${renderParagraphs(post.content || post.summary)}
            ${renderDetails(post.details)}
            ${renderParagraphs(post.closing)}
        </div>

        <footer class="community-post-actions">
            ${renderExternalLink(post)}
            <a class="community-post-back" href="notice.html">목록으로 돌아가기</a>
        </footer>
    `;

    document.title = `${post.title} | 전북대학교 K-방위산업연구소`;
}

async function loadNoticePost() {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('post');

    if (!postId || !/^[a-zA-Z0-9_-]+$/.test(postId)) {
        postElement.innerHTML = '<p class="community-board-empty">게시글을 찾을 수 없습니다.</p>';
        return;
    }

    try {
        const response = await fetch(`${repoRoot}/data/notice/${postId}.json`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const post = await response.json();
        renderPost(post);
    } catch (error) {
        console.error('공지사항 상세 로드 실패:', error);
        postElement.innerHTML = `
            <p class="community-board-empty">게시글을 불러오지 못했습니다.</p>
            <footer class="community-post-actions">
                <a class="community-post-back" href="notice.html">목록으로 돌아가기</a>
            </footer>
        `;
    }
}

loadNoticePost();
