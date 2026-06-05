// Blacksburg Church — Mobile-first styles
// Applied when body[data-device="mobile"] is set.

function MobileStyles() {
  const css = `

/* ═══════════════════════════════════════════════════
   BASE
═══════════════════════════════════════════════════ */
[data-device="mobile"] {
  -webkit-text-size-adjust: 100%;
  overflow-x: hidden;
}
[data-device="mobile"] * {
  -webkit-tap-highlight-color: transparent;
  max-width: 100%;
}
[data-device="mobile"] img { max-width: 100%; }

/* ═══════════════════════════════════════════════════
   TEXT OVERFLOW PREVENTION
   Remove white-space: nowrap from all non-button elements
   so long strings wrap instead of running off screen.
   Buttons keep their nowrap so labels stay on one line.
═══════════════════════════════════════════════════ */
[data-device="mobile"] span[style*="white-space: nowrap"],
[data-device="mobile"] span[style*="whiteSpace"],
[data-device="mobile"] div[style*="white-space: nowrap"]:not([data-bc-map-tooltip]) {
  white-space: normal !important;
  overflow-wrap: break-word !important;
  word-break: break-word !important;
}
[data-device="mobile"] [data-bc-map-tooltip] {
  white-space: nowrap !important;
  overflow-wrap: normal !important;
  word-break: normal !important;
  max-width: none !important;
}
[data-device="mobile"] h1,
[data-device="mobile"] h2,
[data-device="mobile"] h3,
[data-device="mobile"] h4 {
  overflow-wrap: break-word !important;
  word-break: break-word !important;
  hyphens: auto !important;
}

/* ═══════════════════════════════════════════════════
   HAMBURGER — hidden globally, shown on mobile only
═══════════════════════════════════════════════════ */
button[data-bc-hamburger] { display: none !important; }
[data-device="mobile"] button[data-bc-hamburger] { display: flex !important; }

/* ═══════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════ */
[data-device="mobile"] nav[data-bc-nav] {
  padding: 0 16px !important;
  height: 56px !important;
  top: 54px !important;
}
[data-device="mobile"] nav[data-bc-nav] img { height: 34px !important; }
[data-device="mobile"] nav[data-bc-nav] > div[data-bc-navlinks] { display: none !important; }
[data-device="mobile"] nav[data-bc-nav] > button[data-bc-navcta] { display: none !important; }

/* ═══════════════════════════════════════════════════
   ANNOUNCEMENT BAR
═══════════════════════════════════════════════════ */
[data-device="mobile"] [data-bc-announce] {
  position: sticky !important;
  top: 0 !important;
  z-index: 101 !important;
  padding: 9px 16px !important;
  font-size: 11px !important;
  flex-wrap: wrap !important;
  gap: 4px 10px !important;
  line-height: 1.4 !important;
  justify-content: flex-start !important;
  text-align: left !important;
}

/* ═══════════════════════════════════════════════════
   SECTION PADDING — reduce all horizontal padding to 20px
═══════════════════════════════════════════════════ */
[data-device="mobile"] section {
  padding-left: 20px !important;
  padding-right: 20px !important;
}
[data-device="mobile"] footer {
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-top: 52px !important;
  padding-bottom: 28px !important;
}

/* Vertical padding: tall desktop sections → tighter on mobile */
[data-device="mobile"] section[style*="padding: 120px 48px"] {
  padding-top: 60px !important; padding-bottom: 60px !important;
}
[data-device="mobile"] section[style*="padding: 96px 48px"] {
  padding-top: 56px !important; padding-bottom: 56px !important;
}
[data-device="mobile"] section[style*="padding: 100px 48px"] {
  padding-top: 56px !important; padding-bottom: 56px !important;
}
[data-device="mobile"] section[style*="padding: 80px 48px"] {
  padding-top: 44px !important; padding-bottom: 44px !important;
}
[data-device="mobile"] section[style*="padding: 64px 48px"] {
  padding-top: 40px !important; padding-bottom: 40px !important;
}
[data-device="mobile"] section[style*="padding: 48px 48px 64px"] {
  padding-top: 32px !important; padding-bottom: 40px !important;
}
/* Connect page */
[data-device="mobile"] section[style*="padding: 32px 48px"] {
  padding-top: 24px !important; padding-bottom: 36px !important;
}

/* Section-like DIVs with 48px padding */
[data-device="mobile"] div[style*="padding: 120px 48px"] {
  padding: 60px 20px !important;
}
[data-device="mobile"] div[style*="padding: 100px 48px"] {
  padding: 56px 20px !important;
}
[data-device="mobile"] div[style*="padding: 80px 48px"] {
  padding: 44px 20px !important;
}
[data-device="mobile"] div[style*="padding: 72px 48px"] {
  padding: 40px 20px !important;
}
[data-device="mobile"] div[style*="padding: 56px 48px"] {
  padding: 36px 20px !important;
}

/* Page heroes with 3-value padding (top / side / bottom) */
[data-device="mobile"] div[style*="100px 48px 88px"] {
  padding: 52px 20px 44px !important;
}
[data-device="mobile"] div[style*="100px 48px 200px"] {
  padding: 52px 20px 110px !important;
}
/* Gatherings details card overlap */
[data-device="mobile"] div[style*="margin: -140px auto"] {
  margin-top: -80px !important;
}
[data-device="mobile"] section[style*="padding: 0 48px 40px"] {
  padding: 0 20px 20px !important;
}

/* ═══════════════════════════════════════════════════
   HERO SECTIONS
═══════════════════════════════════════════════════ */
[data-device="mobile"] [data-bc-hero] {
  min-height: calc(92vh - 56px) !important;
  align-items: flex-end !important;
}
[data-device="mobile"] [data-bc-hero-inner] {
  padding: 0 20px 22vh !important;
}
[data-device="mobile"] [data-bc-hero-coords] { display: none !important; }

/* Typographic hero */
[data-device="mobile"] [data-bc-hero-type-wrap] { overflow: hidden !important; }
[data-device="mobile"] [data-bc-hero-type] {
  font-size: clamp(72px, 19vw, 100px) !important;
  line-height: 0.88 !important;
  text-align: left !important;
}
[data-device="mobile"] [data-bc-hero-type-row] {
  flex-direction: column !important;
  gap: 24px !important;
  align-items: flex-start !important;
  margin-top: 32px !important;
}
[data-device="mobile"] [data-bc-hero-type-row] > div:last-child {
  flex-direction: column !important;
  gap: 10px !important;
  width: 100% !important;
}
[data-device="mobile"] [data-bc-hero-type-row] > div:last-child button {
  width: 100% !important;
  justify-content: center !important;
}

/* ═══════════════════════════════════════════════════
   TYPOGRAPHY
═══════════════════════════════════════════════════ */
[data-device="mobile"] h1[data-bc-h1-xl] {
  font-size: clamp(40px, 11vw, 56px) !important;
  line-height: 1.0 !important;
  letter-spacing: -0.03em !important;
  margin-bottom: 32px !important;
}
[data-device="mobile"] h1[data-bc-h1] {
  font-size: 38px !important;
  line-height: 1.0 !important;
}
[data-device="mobile"] h2[data-bc-h2] {
  font-size: 30px !important;
  line-height: 1.08 !important;
  margin-bottom: 18px !important;
}
[data-device="mobile"] h2[data-bc-h2] br { display: none !important; }

/* Untagged large headings — cap by pixel value */
[data-device="mobile"] h1[style*="clamp"] {
  font-size: clamp(38px, 11vw, 52px) !important;
  line-height: 1.0 !important;
}
[data-device="mobile"] h2[style*="font-size: 56px"],
[data-device="mobile"] h2[style*="fontSize: 56"] {
  font-size: 28px !important; line-height: 1.1 !important;
}
[data-device="mobile"] h2[style*="font-size: 48px"] {
  font-size: 26px !important; line-height: 1.1 !important;
}
[data-device="mobile"] h2[style*="font-size: 40px"] {
  font-size: 24px !important; line-height: 1.15 !important;
}
[data-device="mobile"] h2[style*="clamp"] {
  font-size: clamp(26px, 8vw, 36px) !important;
  line-height: 1.1 !important;
}
[data-device="mobile"] h3[style*="font-size: 28px"],
[data-device="mobile"] h3[style*="font-size: 26px"] {
  font-size: 22px !important; line-height: 1.2 !important;
}
[data-device="mobile"] h3[style*="clamp"] {
  font-size: clamp(22px, 6vw, 32px) !important;
}
/* Lead body copy */
[data-device="mobile"] p[style*="font-size: 20px"],
[data-device="mobile"] p[style*="font-size: 19px"],
[data-device="mobile"] p[style*="font-size: 18px"] {
  font-size: 15px !important;
  line-height: 1.65 !important;
}
[data-device="mobile"] p[style*="font-size: 22px"] {
  font-size: 16px !important;
  line-height: 1.6 !important;
}
[data-device="mobile"] [data-bc-lead] {
  font-size: 15px !important;
  line-height: 1.65 !important;
  margin-bottom: 24px !important;
}

/* ═══════════════════════════════════════════════════
   BUTTONS
═══════════════════════════════════════════════════ */
[data-device="mobile"] [data-bc-btnrow] {
  flex-direction: column !important;
  align-items: stretch !important;
  gap: 10px !important;
  width: 100% !important;
}
[data-device="mobile"] [data-bc-btnrow] button,
[data-device="mobile"] [data-bc-btnrow] a {
  justify-content: center !important;
  width: 100% !important;
  text-align: center !important;
}

/* ═══════════════════════════════════════════════════
   GRIDS — collapse to single column
═══════════════════════════════════════════════════ */
[data-device="mobile"] [style*="grid-template-columns: repeat(3"],
[data-device="mobile"] [style*="grid-template-columns: repeat(4"] {
  grid-template-columns: 1fr !important;
  gap: 16px !important;
}
/* 2-col content/split grids */
[data-device="mobile"] [style*="grid-template-columns: 1fr 1.1fr"],
[data-device="mobile"] [style*="grid-template-columns: 1.1fr 1fr"],
[data-device="mobile"] [style*="grid-template-columns: 1fr 1.2fr"],
[data-device="mobile"] [style*="grid-template-columns: 1.2fr 1fr"],
[data-device="mobile"] [style*="grid-template-columns: 1.4fr 1fr"],
[data-device="mobile"] [style*="grid-template-columns: 1.3fr 1fr"],
[data-device="mobile"] [style*="grid-template-columns: 1.5fr 1fr 1fr 1.2fr"] {
  grid-template-columns: 1fr !important;
  gap: 24px !important;
}
/* Gatherings info card: 4 cols → 2×2 */
[data-device="mobile"] [style*="grid-template-columns: 0.85fr 1.5fr 1fr 1fr"] {
  grid-template-columns: 1fr 1fr !important;
  gap: 20px !important;
}
[data-device="mobile"] [style*="grid-template-columns: 0.85fr 1.5fr 1fr 1fr"] > div {
  border-left: none !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  border-top: 1px solid #E8D9BC;
  padding-top: 16px !important;
}
[data-device="mobile"] [style*="grid-template-columns: 0.85fr 1.5fr 1fr 1fr"] > div:first-child,
[data-device="mobile"] [style*="grid-template-columns: 0.85fr 1.5fr 1fr 1fr"] > div:nth-child(2) {
  border-top: none !important; padding-top: 0 !important;
}
/* Inline whiteSpace: nowrap on cards: allow wrap */
[data-device="mobile"] [style*="grid-template-columns: 0.85fr 1.5fr 1fr 1fr"] div[style*="whiteSpace: 'nowrap'"],
[data-device="mobile"] [style*="grid-template-columns: 0.85fr 1.5fr 1fr 1fr"] div[style*="white-space: nowrap"] {
  white-space: normal !important;
}

/* ═══════════════════════════════════════════════════
   VALUES STRIP (homepage)
═══════════════════════════════════════════════════ */
[data-device="mobile"] [data-bc-values] {
  grid-template-columns: 1fr 1fr !important;
  gap: 28px !important;
}
[data-device="mobile"] [data-bc-values] > div > div {
  border-left: none !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
[data-device="mobile"] [data-bc-val-value] { font-size: 28px !important; }

/* ═══════════════════════════════════════════════════
   SECTION HEAD (heading + CTA button row)
═══════════════════════════════════════════════════ */
[data-device="mobile"] [data-bc-sectionhead] {
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 14px !important;
  margin-bottom: 32px !important;
}
[data-device="mobile"] div[style*="justify-content: space-between"][style*="align-items: flex-end"] {
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 14px !important;
}

/* ═══════════════════════════════════════════════════
   MESSAGES PAGE
═══════════════════════════════════════════════════ */
/* Library row: 4-col → 2-col (icon + title; hide series + duration) */
[data-device="mobile"] [style*="grid-template-columns: 52px 1fr 180px 80px"] {
  grid-template-columns: 40px 1fr !important;
  gap: 14px !important;
  padding: 16px 0 !important;
}
[data-device="mobile"] [style*="grid-template-columns: 52px 1fr 180px 80px"] > *:nth-child(n+3) {
  display: none !important;
}
/* Filter rows */
[data-device="mobile"] div[style*="grid-template-columns: 100px 1fr"] {
  display: block !important;
  padding: 10px 0 !important;
}
[data-device="mobile"] div[style*="grid-template-columns: 100px 1fr"] > div:first-child {
  margin-bottom: 8px !important;
}
[data-device="mobile"] div[style*="grid-template-columns: 100px 1fr"] > div:last-child {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 6px !important;
}

/* ═══════════════════════════════════════════════════
   STICKY — disable on mobile (becomes normal block)
═══════════════════════════════════════════════════ */
[data-device="mobile"] [style*="position: sticky"]:not([data-bc-nav]) {
  position: relative !important;
  top: auto !important;
}

/* ═══════════════════════════════════════════════════
   IMAGES / ASPECT RATIOS
═══════════════════════════════════════════════════ */
[data-device="mobile"] [data-bc-aspect-4-5] { aspect-ratio: 3/2 !important; }
[data-device="mobile"] [style*="aspect-ratio: 4/5"] { aspect-ratio: 3/2 !important; }
[data-device="mobile"] [style*="aspect-ratio: 1/1"] { aspect-ratio: 4/3 !important; }

/* ═══════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════ */
[data-device="mobile"] [data-bc-footer-grid] {
  grid-template-columns: 1fr 1fr !important;
  gap: 24px 20px !important;
}
[data-device="mobile"] [data-bc-footer-grid] > div:first-child { grid-column: 1 / -1 !important; }
[data-device="mobile"] [data-bc-footer-grid] > div:last-child { grid-column: 1 / -1 !important; }
[data-device="mobile"] [data-bc-footer-wordmark] {
  font-size: 44px !important;
  line-height: 1 !important;
  margin-bottom: 24px !important;
}
[data-device="mobile"] [data-bc-footer-bottom] {
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 10px !important;
}
[data-device="mobile"] [data-bc-footer-bottom] > div:last-child {
  flex-wrap: wrap !important;
}

/* ═══════════════════════════════════════════════════
   FORM INPUTS — mobile-optimized tap targets
═══════════════════════════════════════════════════ */
[data-device="mobile"] input[style*="padding: 12px"],
[data-device="mobile"] input[style*="padding: '12px"] {
  padding: 14px 14px !important;
  font-size: 16px !important;
}
[data-device="mobile"] textarea[style*="padding: 12px"],
[data-device="mobile"] textarea[style*="padding: 14px"] {
  padding: 14px !important;
  font-size: 16px !important;
}
/* Prevent iOS zoom on focus (requires font-size >= 16px) */
[data-device="mobile"] input, [data-device="mobile"] textarea, [data-device="mobile"] select {
  font-size: 16px !important;
}

/* ═══════════════════════════════════════════════════
   CONNECT FORM options — full-width selectors on mobile
═══════════════════════════════════════════════════ */
[data-device="mobile"] div[style*="grid-template-columns: repeat(2, 1fr)"] button {
  min-height: 50px !important;
  padding: 13px 12px !important;
  font-size: 13px !important;
}

/* ═══════════════════════════════════════════════════
   CTA BAND (orange strip with heading + button)
═══════════════════════════════════════════════════ */
[data-device="mobile"] section[style*="background: rgb(245, 130, 32)"],
[data-device="mobile"] section[style*="background: #F58220"] {
  padding-top: 44px !important; padding-bottom: 44px !important;
}
[data-device="mobile"] section[style*="background: rgb(245, 130, 32)"] > div,
[data-device="mobile"] section[style*="background: #F58220"] > div {
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 24px !important;
}
[data-device="mobile"] section[style*="background: rgb(245, 130, 32)"] button,
[data-device="mobile"] section[style*="background: #F58220"] button {
  width: 100% !important;
  justify-content: center !important;
}

/* ═══════════════════════════════════════════════════
   MAP LEGEND — swap overlay → full-width bar on mobile
═══════════════════════════════════════════════════ */
[data-bc-map-legend-bar] { display: none !important; }
[data-device="mobile"] [data-bc-map-legend-overlay] { display: none !important; }
[data-device="mobile"] [data-bc-map-legend-bar] { display: flex !important; }

/* ═══════════════════════════════════════════════════
   HOUSE CHURCH PILLARS (I / II / III steps)
   Desktop: horizontal 3-col with timeline dots + dashes
   Mobile: vertical steps with orange left accent
═══════════════════════════════════════════════════ */
[data-device="mobile"] [data-bc-pillar-line],
[data-device="mobile"] [data-bc-pillar-dot] { display: none !important; }
[data-device="mobile"] [data-bc-pillars] { gap: 0 !important; }
[data-device="mobile"] [data-bc-pillar] {
  padding: 0 0 0 20px !important;
  border-right: none !important;
  border-left: 3px solid #F58220 !important;
  margin-bottom: 28px !important;
}
[data-device="mobile"] [data-bc-pillar]:last-child { margin-bottom: 0 !important; }

/* ═══════════════════════════════════════════════════
   HOUSE CHURCH CARDS padding
═══════════════════════════════════════════════════ */
[data-device="mobile"] div[style*="padding: 32px 28px"] {
  padding: 24px 20px !important;
}

/* ═══════════════════════════════════════════════════
   HOUSE CHURCHES PAGE — finder section 48px 48px 100px
═══════════════════════════════════════════════════ */
[data-device="mobile"] section[style*="48px 48px 100px"] {
  padding-top: 36px !important; padding-bottom: 56px !important;
}
[data-device="mobile"] section[style*="padding: 88px 48px"] {
  padding-top: 48px !important; padding-bottom: 48px !important;
}

/* ═══════════════════════════════════════════════════
   CTA BAND — orange strip (flex heading + button)
═══════════════════════════════════════════════════ */
[data-device="mobile"] section[style*="padding: 80px 48px"] > div[style*="space-between"] {
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 24px !important;
}
[data-device="mobile"] section[style*="padding: 80px 48px"] > div[style*="space-between"] > button {
  width: 100% !important;
  justify-content: center !important;
}

/* ═══════════════════════════════════════════════════
   OVERFLOW / CLIP
═══════════════════════════════════════════════════ */
[data-device="mobile"] { overflow-x: hidden; }
`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

Object.assign(window, { MobileStyles });
