// Blacksburg Church — Mobile style overrides
// When [data-device="mobile"] wraps the app, these rules retarget desktop
// layouts to phone width. We use BOTH targeted data-bc-* attrs (where set)
// and generic selectors that match the inline style patterns the pages use.

function MobileStyles() {
  const css = `
[data-device="mobile"] { -webkit-text-size-adjust: 100%; }

/* ── NAV ──────────────────────────────────────────────── */
[data-device="mobile"] nav[data-bc-nav] > div[data-bc-navlinks] { display: none !important; }
[data-device="mobile"] nav[data-bc-nav] > button[data-bc-navcta] { display: none !important; }
[data-device="mobile"] nav[data-bc-nav] { padding: 0 20px !important; height: 60px !important; }
[data-device="mobile"] nav[data-bc-nav] img { height: 44px !important; }
[data-device="desktop"] button[data-bc-hamburger] { display: none !important; }

/* ── ANNOUNCEMENT bar ─────────────────────────────────── */
[data-device="mobile"] [data-bc-announce] {
  padding: 8px 14px !important; font-size: 11px !important;
  flex-wrap: wrap !important; gap: 6px !important; line-height: 1.4 !important;
}

/* ── GENERIC: shrink section padding ──────────────────── */
[data-device="mobile"] section,
[data-device="mobile"] footer > div > div,
[data-device="mobile"] [data-bc-section] {
  padding-left: 20px !important;
  padding-right: 20px !important;
}
[data-device="mobile"] footer {
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-top: 56px !important;
  padding-bottom: 24px !important;
}

/* Section generous vertical rhythm -> tighter */
[data-device="mobile"] section[style*="padding: 120px 48px"],
[data-device="mobile"] section[style*="padding: '120px 48px'"] {
  padding-top: 64px !important; padding-bottom: 64px !important;
}
[data-device="mobile"] section[style*="padding: 100px 48px"],
[data-device="mobile"] section[style*="padding: 88px 48px"] {
  padding-top: 56px !important; padding-bottom: 56px !important;
}
[data-device="mobile"] section[style*="padding: 80px 48px"] {
  padding-top: 48px !important; padding-bottom: 48px !important;
}
[data-device="mobile"] div[style*="padding: 120px 48px"] {
  padding: 64px 20px !important;
}
[data-device="mobile"] div[style*="padding: 80px 48px"] {
  padding: 48px 20px !important;
}
[data-device="mobile"] div[style*="padding: 100px 48px"] {
  padding: 56px 20px !important;
}
[data-device="mobile"] div[style*="padding: 72px 48px 48px"] {
  padding: 32px 20px 32px !important;
}

[data-device="mobile"] [data-bc-pytight] { padding-top: 48px !important; padding-bottom: 48px !important; }
[data-device="mobile"] [data-bc-pymed]   { padding-top: 64px !important; padding-bottom: 64px !important; }
[data-device="mobile"] [data-bc-pytall]  { padding-top: 80px !important; padding-bottom: 72px !important; }

/* ── GRIDS: collapse ──────────────────────────────────── */
[data-device="mobile"] [data-bc-grid],
[data-device="mobile"] [data-bc-grid-split],
[data-device="mobile"] [style*="grid-template-columns: repeat(3"],
[data-device="mobile"] [style*="grid-template-columns: repeat(4"],
[data-device="mobile"] [style*="gridTemplateColumns: 'repeat(3"],
[data-device="mobile"] [style*="gridTemplateColumns: 'repeat(4"],
[data-device="mobile"] [style*="grid-template-columns: 1fr 1.1fr"],
[data-device="mobile"] [style*="grid-template-columns: 1.1fr 1fr"],
[data-device="mobile"] [style*="grid-template-columns: 1fr 1.2fr"],
[data-device="mobile"] [style*="grid-template-columns: 1.2fr 1fr"],
[data-device="mobile"] [style*="grid-template-columns: 1.5fr 1fr 1fr 1.2fr"],
[data-device="mobile"] [style*="grid-template-columns: 0.85fr"] {
  grid-template-columns: 1fr !important;
  gap: 20px !important;
}
[data-device="mobile"] [data-bc-grid-2],
[data-device="mobile"] [style*="grid-template-columns: repeat(2"] {
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 12px !important;
}
[data-device="mobile"] [data-bc-values] {
  grid-template-columns: 1fr !important;
  gap: 24px !important;
}
[data-device="mobile"] [data-bc-values] > div > div[style*="border-left"] {
  border-left: none !important;
  padding-left: 0 !important;
}
[data-device="mobile"] [data-bc-val-value] { font-size: 30px !important; }

/* ── HEADINGS ────────────────────────────────────────── */
[data-device="mobile"] [data-bc-lead]   { font-size: 16px !important; line-height: 1.6 !important; margin-bottom: 28px !important; }

/* Generic h1/h2 in pages we didn't tag — cap by size */
[data-device="mobile"] h1[style*="font-size: clamp"] { font-size: 44px !important; line-height: 1 !important; }
[data-device="mobile"] h2[style*="font-size: clamp"] { font-size: 34px !important; line-height: 1.05 !important; }
[data-device="mobile"] h2[style*="fontSize: 56"], [data-device="mobile"] h2[style*="font-size: 56px"] {
  font-size: 32px !important; line-height: 1.05 !important; margin-bottom: 20px !important;
}

/* Tagged rules override the fallbacks above — placed last for specificity-tie winning */
[data-device="mobile"] h1[data-bc-h1-xl][data-bc-h1-xl] { font-size: 38px !important; line-height: 1 !important; letter-spacing: -0.03em !important; }
[data-device="mobile"] h1[data-bc-h1][data-bc-h1]       { font-size: 40px !important; line-height: 1 !important; }
[data-device="mobile"] h2[data-bc-h2][data-bc-h2]       { font-size: 34px !important; line-height: 1.05 !important; margin-bottom: 20px !important; }
[data-device="mobile"] h2[data-bc-h2][data-bc-h2] br    { display: none !important; }

/* ── BUTTONS ─────────────────────────────────────────── */
[data-device="mobile"] [data-bc-btnrow] {
  flex-direction: column !important;
  align-items: stretch !important;
  gap: 10px !important;
}
[data-device="mobile"] [data-bc-btnrow] button,
[data-device="mobile"] [data-bc-btnrow] a {
  justify-content: center !important;
  width: 100% !important;
}

/* ── FOOTER ──────────────────────────────────────────── */
[data-device="mobile"] footer [data-bc-footer-grid] {
  grid-template-columns: 1fr 1fr !important;
  gap: 32px 20px !important;
}
[data-device="mobile"] footer [data-bc-footer-grid] > div:first-child { grid-column: 1 / -1 !important; }
[data-device="mobile"] footer [data-bc-footer-grid] > div:last-child { grid-column: 1 / -1 !important; }
[data-device="mobile"] footer [data-bc-footer-wordmark] { font-size: 56px !important; }
[data-device="mobile"] footer [data-bc-footer-bottom] {
  flex-direction: column !important; align-items: flex-start !important; gap: 12px !important;
}

/* ── HERO ────────────────────────────────────────────── */
[data-device="mobile"] [data-bc-hero] { min-height: calc(100vh - 60px) !important; }
[data-device="mobile"] [data-bc-hero-inner] { padding: 48px 20px !important; }
[data-device="mobile"] [data-bc-hero-coords] {
  bottom: 14px !important; right: 20px !important; font-size: 9px !important;
}
[data-device="mobile"] [data-bc-hero-type] { font-size: 104px !important; line-height: 0.88 !important; }
[data-device="mobile"] [data-bc-hero-type-row] { flex-direction: column !important; gap: 20px !important; align-items: flex-start !important; }
[data-device="mobile"] [data-bc-hero-type-row] > div:last-child { width: 100% !important; flex-direction: column !important; gap: 10px !important; }
[data-device="mobile"] [data-bc-hero-type-row] > div:last-child button { width: 100% !important; justify-content: center !important; }

/* ── SECTION header w/ CTA row stacks ───────────────── */
[data-device="mobile"] [data-bc-sectionhead],
[data-device="mobile"] div[style*="justify-content: space-between"][style*="flex-wrap: wrap"] {
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 20px !important;
}

/* ── Aspect-ratio squish ─────────────────────────────── */
[data-device="mobile"] [data-bc-aspect-4-5] { aspect-ratio: 4/3 !important; }
[data-device="mobile"] [style*="aspect-ratio: 4/5"] { aspect-ratio: 4/3 !important; }

/* ── Messages row list ───────────────────────────────── */
[data-device="mobile"] [style*="60px 1fr 200px 120px 100px"] {
  grid-template-columns: 48px 1fr !important;
  gap: 14px !important;
  padding: 14px 0 !important;
}
[data-device="mobile"] [style*="60px 1fr 200px 120px 100px"] > *:nth-child(n+3) {
  display: none !important;
}

/* ── Overflow guard ──────────────────────────────────── */
[data-device="mobile"] { overflow-x: hidden; }
[data-device="mobile"] [data-bc-hero-type-wrap] { overflow: hidden; }
`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

Object.assign(window, { MobileStyles });
