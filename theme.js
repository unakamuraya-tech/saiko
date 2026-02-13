/**
 * 地方再興エコシステム Dashboard 共通ロジック
 * - テーマ切替（ダーク/ライト）
 * - サイドバーの自動生成・共通化
 * - アクティブリンクの自動判定
 */

const APP_CONFIG = {
  version: "v2.1",
  lastUpdated: "2026-02-13",
  footerText: "12材料を統合した全体構想"
};

// 1. テーマ初期化 (ブロッキング回避のため即時実行)
(function() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

/**
 * テーマ切替
 */
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
}

/**
 * サイドバーの生成
 */
function renderSidebar() {
  const sidebar = document.getElementById('sidebar-target');
  if (!sidebar) return;

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const navMenuItems = [
    { section: "Overview", items: [
      { href: "index.html", icon: "📊", label: "ダッシュボード" }
    ]},
    { section: "構想", items: [
      { href: "ecosystem.html", icon: "🔄", label: "エコシステム" },
      { href: "levels.html", icon: "🪜", label: "挑戦者レベル" },
      { href: "portfolio.html", icon: "📦", label: "プロダクト" }
    ]},
    { section: "戦略", items: [
      { href: "revenue.html", icon: "💰", label: "収益モデル" },
      { href: "action.html", icon: "📅", label: "アクションプラン" },
      { href: "skills.html", icon: "⚔️", label: "5大スキル" }
    ]}
  ];

  let navHtml = '';
  navMenuItems.forEach(sec => {
    navHtml += `<div class="nav-section">
      <div class="nav-section-title">${sec.section}</div>
      ${sec.items.map(item => `
        <a href="${item.href}" class="nav-link ${currentPath === item.href ? 'active' : ''}">
          <span class="icon">${item.icon}</span> ${item.label}
        </a>
      `).join('')}
    </div>`;
  });

  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <div class="sidebar-brand-icon">🔥</div>
      <h1>地方再興</h1>
    </div>
    <div class="sidebar-version">エコシステム構想 ${APP_CONFIG.version}</div>
    <nav>${navHtml}</nav>
    <div class="sidebar-footer">
      <div class="sidebar-footer-text">
        作成日: ${APP_CONFIG.lastUpdated}<br>
        ${APP_CONFIG.footerText}
      </div>
      <button class="theme-toggle" onclick="toggleTheme()">☀️</button>
    </div>
  `;
}

// DOMContentLoaded時に実行
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  updateThemeIcon(document.documentElement.getAttribute('data-theme'));

  // イベント委譲による挙動管理 (Maintenance Friendly)
  document.addEventListener('click', (e) => {
    // モバイルトグル
    if (e.target.closest('.mobile-toggle')) {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.classList.toggle('open');
    }
  });
});

