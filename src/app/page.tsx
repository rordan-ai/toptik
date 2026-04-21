"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const navItems = [
  { href: "#deals", label: "מבצעים" },
  { href: "#about", label: "אודותינו" },
  { href: "#stores", label: "סניפים" },
];

const categories = [
  {
    label: "עיצוב איטלקי",
    sub: "אלגנטיות על-זמנית",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-7h6v7M9 9V7M12 9V6M15 9V7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "פונקציונליות חכמה",
    sub: "תכונות חדשניות",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "חומרי גלם איכותיים",
    sub: "איכות יוצאת דופן",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 3l-4 6 10 12L22 9l-4-6H6z M11 3 L8 9 L12 21 L16 9 L13 3 M2 9h20" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="page">
      <div className="stage" data-variant="v1">
        {/* Hero (without baked-in bottom bar) */}
        <Image
          src="/hero-clean.png"
          alt="TopTik Hero"
          fill
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className="hero-img"
        />

        <div className="scrim-top" aria-hidden />
        <div className="warm-tone" aria-hidden />
        <div className="halation" aria-hidden />
        <div className="vignette" aria-hidden />

        {/* ═══ DESKTOP TOP NAVBAR (≥768px) ═══ */}
        <header className="navbar desktop-only">
          <div className="brand">
            <div className="title">TOPTIK COLLECTION</div>
            <div className="slogan">Move in Style. Travel with Purpose.</div>
          </div>

          <nav aria-label="Primary" dir="rtl">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="cta" href="https://wa.me/" target="_blank" rel="noopener" dir="rtl">
            <WhatsAppIcon />
            דברו איתנו בוואטסאפ
          </a>
        </header>

        {/* ═══ DESKTOP BOTTOM BAR (≥768px) — image-based, 1:1 from Figma ═══ */}
        <div className="bottom-bar desktop-only">
          <Image
            src="/bottom-bar.png"
            alt="קטגוריות TopTik"
            fill
            quality={100}
            unoptimized
            sizes="100vw"
            className="bottom-bar-img"
            priority
          />
        </div>

        {/* ═══ MOBILE TOP BAR (<768px) ═══ */}
        <header className="m-topbar mobile-only">
          <div className="m-brand">
            <div className="m-title">TOPTIK COLLECTION</div>
            <div className="m-slogan">Move in Style.</div>
          </div>
          <button
            className="m-burger"
            aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`m-burger-icon ${menuOpen ? "open" : ""}`} />
          </button>
        </header>

        {/* ═══ MOBILE SLIDE-DOWN MENU ═══ */}
        <div
          className={`m-menu mobile-only ${menuOpen ? "open" : ""}`}
          role="dialog"
          aria-hidden={!menuOpen}
        >
          <nav dir="rtl">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className="m-menu-cta"
            href="https://wa.me/"
            target="_blank"
            rel="noopener"
            dir="rtl"
            onClick={() => setMenuOpen(false)}
          >
            <WhatsAppIcon />
            דברו איתנו בוואטסאפ
          </a>
        </div>

        {/* ═══ MOBILE BOTTOM BAR (<768px) — HTML/CSS, fully readable ═══ */}
        <div className="m-bottombar mobile-only" dir="rtl">
          <div className="m-bb-categories">
            {categories.map((c) => (
              <div key={c.label} className="m-bb-cat">
                <div className="m-bb-icon">{c.icon}</div>
                <div className="m-bb-label">{c.label}</div>
              </div>
            ))}
          </div>
          <div className="m-bb-brands">
            <span className="m-bb-mandarina">MANDARINA DUCK</span>
            <span className="m-bb-toptik">TOPTIK</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ═════════════════════════════════════════════════════════
           VISIBILITY TOGGLES — controls who renders at what width
           ═════════════════════════════════════════════════════════ */
        .desktop-only { display: flex; }
        .mobile-only { display: none; }

        @media (max-width: 767px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex; }
        }

        /* ═════════════════════════════════════════════════════════
           STAGE
           ═════════════════════════════════════════════════════════ */
        .page {
          max-width: 1366px;
          margin: 0 auto;
        }
        .stage {
          position: relative;
          width: 100%;
          aspect-ratio: 1366 / 768;
          overflow: hidden;
          background: #fdf8ee;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
        }
        @media (max-width: 767px) {
          .stage {
            aspect-ratio: auto;
            min-height: 100dvh;
          }
        }
        .hero-img {
          object-fit: cover;
          object-position: center top;
          filter:
            contrast(var(--contrast))
            saturate(var(--sat))
            brightness(var(--brightness));
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        @media (max-width: 767px) {
          .hero-img {
            object-position: 70% center;
          }
        }

        /* ═════════════════════════════════════════════════════════
           ATMOSPHERIC LAYERS (untouched)
           ═════════════════════════════════════════════════════════ */
        .scrim-top {
          position: absolute; inset: 0 0 auto 0; height: 42%;
          pointer-events: none;
          background: radial-gradient(ellipse 55% 90% at 26% 18%,
            rgba(255, 252, 246, calc(var(--scrim-strength) * 0.75)) 0%,
            rgba(255, 252, 246, calc(var(--scrim-strength) * 0.30)) 35%,
            rgba(255, 252, 246, 0) 70%);
          mix-blend-mode: screen;
        }
        .warm-tone {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 90% 60% at 70% 40%,
            rgba(255, 196, 120, calc(var(--warm) * 1.2)) 0%,
            rgba(255, 196, 120, 0) 70%);
          mix-blend-mode: soft-light;
        }
        .halation {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 30% 40% at 60% 55%, rgba(255, 200, 90, calc(var(--halation) * 0.45)) 0%, transparent 60%),
            radial-gradient(ellipse 55% 35% at 50% 15%, rgba(255, 220, 160, calc(var(--halation) * 0.35)) 0%, transparent 70%);
          mix-blend-mode: screen;
        }
        .vignette {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 80% 70% at 50% 50%, transparent 55%, rgba(0, 0, 0, calc(var(--vignette) * 0.55)) 100%);
        }

        /* ═════════════════════════════════════════════════════════
           DESKTOP NAVBAR (≥768px) — UNCHANGED FROM WORKING VERSION
           ═════════════════════════════════════════════════════════ */
        .navbar {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 11.5%;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(18px, 3.2%, 48px);
          z-index: 6;
          direction: ltr;
          background: var(--bar-bg);
          backdrop-filter: blur(12px) saturate(1.08);
          -webkit-backdrop-filter: blur(12px) saturate(1.08);
        }
        .brand {
          display: flex; flex-direction: column;
          align-items: flex-start; justify-content: center;
          line-height: 1.02; color: var(--ink); user-select: none;
        }
        .brand .title {
          font-family: var(--font-italiana), var(--font-playfair), serif;
          font-weight: 400; letter-spacing: 0.22em;
          font-size: clamp(16px, 2.2vw, 28px);
          color: var(--ink); white-space: nowrap;
        }
        .brand .slogan {
          font-family: var(--font-great-vibes), cursive;
          font-size: clamp(13px, 1.5vw, 19px);
          color: var(--ink-soft); margin-top: 2px;
          white-space: nowrap; line-height: 1.1;
        }
        .navbar nav {
          display: flex; align-items: center;
          gap: clamp(14px, 2.2vw, 30px);
        }
        .navbar nav a {
          font-family: var(--font-assistant), var(--font-rubik), sans-serif;
          font-size: clamp(13px, 1.15vw, 16px);
          font-weight: 600; letter-spacing: 0.02em;
          color: var(--ink); text-decoration: none;
          position: relative; padding: 6px 2px;
          transition: color 0.2s ease;
        }
        .navbar nav a::after {
          content: ""; position: absolute;
          left: 0; right: 0; bottom: 0; height: 1px;
          background: currentColor; transform: scaleX(0);
          transform-origin: center; transition: transform 0.25s ease;
        }
        .navbar nav a:hover { color: #8a6a2d; }
        .navbar nav a:hover::after { transform: scaleX(1); }
        .navbar .cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-assistant), var(--font-rubik), sans-serif;
          font-size: clamp(12px, 1.05vw, 15px);
          font-weight: 700; color: #fff;
          background: var(--sage);
          padding: 12px 22px; border-radius: 999px;
          text-decoration: none; white-space: nowrap;
          box-shadow: 0 6px 18px -6px rgba(134, 162, 150, 0.55);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .navbar .cta:hover {
          background: var(--sage-dark);
          box-shadow: 0 8px 22px -6px rgba(134, 162, 150, 0.7);
          transform: translateY(-1px);
        }

        /* ═════════════════════════════════════════════════════════
           DESKTOP BOTTOM BAR — UNCHANGED FROM WORKING VERSION
           ═════════════════════════════════════════════════════════ */
        .bottom-bar {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          aspect-ratio: 1368 / 112.2;
          background: #f1e5d3;
          z-index: 5;
          overflow: hidden;
        }
        .bottom-bar :global(.bottom-bar-img) {
          object-fit: contain;
          object-position: center bottom;
          image-rendering: -webkit-optimize-contrast;
        }

        /* ═════════════════════════════════════════════════════════
           MOBILE TOP BAR (<768px)
           ═════════════════════════════════════════════════════════ */
        .m-topbar {
          position: absolute;
          left: 0; right: 0; top: 0;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          z-index: 10;
          direction: ltr;
          background: rgba(253, 248, 238, 0.92);
          backdrop-filter: blur(14px) saturate(1.1);
          -webkit-backdrop-filter: blur(14px) saturate(1.1);
          border-bottom: 1px solid rgba(31, 39, 49, 0.06);
        }
        .m-brand {
          display: flex; flex-direction: column;
          line-height: 1.05; color: var(--ink);
        }
        .m-title {
          font-family: var(--font-italiana), serif;
          font-weight: 400; letter-spacing: 0.18em;
          font-size: 16px; color: var(--ink);
          white-space: nowrap;
        }
        .m-slogan {
          font-family: var(--font-great-vibes), cursive;
          font-size: 14px; color: var(--ink-soft);
          margin-top: 1px; line-height: 1.1;
        }
        .m-burger {
          width: 44px; height: 44px;
          display: inline-flex; align-items: center; justify-content: center;
          background: transparent; border: 1px solid rgba(31, 39, 49, 0.18);
          border-radius: 10px; cursor: pointer;
          color: var(--ink); padding: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .m-burger:active { transform: scale(0.95); }
        .m-burger-icon,
        .m-burger-icon::before,
        .m-burger-icon::after {
          content: "";
          display: block;
          width: 22px; height: 2px;
          background: currentColor; border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease, top 0.3s ease;
          position: relative;
        }
        .m-burger-icon::before {
          position: absolute; top: -7px; left: 0;
        }
        .m-burger-icon::after {
          position: absolute; top: 7px; left: 0;
        }
        .m-burger-icon.open {
          background: transparent;
        }
        .m-burger-icon.open::before {
          transform: rotate(45deg); top: 0;
        }
        .m-burger-icon.open::after {
          transform: rotate(-45deg); top: 0;
        }

        /* ═════════════════════════════════════════════════════════
           MOBILE SLIDE-DOWN MENU
           ═════════════════════════════════════════════════════════ */
        .m-menu {
          position: absolute;
          left: 0; right: 0; top: 72px;
          flex-direction: column;
          align-items: stretch;
          padding: 0 18px;
          background: rgba(253, 248, 238, 0.97);
          backdrop-filter: blur(14px) saturate(1.1);
          -webkit-backdrop-filter: blur(14px) saturate(1.1);
          z-index: 9;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          transition: max-height 0.35s ease, opacity 0.25s ease, padding 0.3s ease;
          border-bottom: 1px solid rgba(31, 39, 49, 0.06);
        }
        .m-menu.open {
          max-height: 360px;
          padding: 14px 18px 22px;
          opacity: 1;
          pointer-events: auto;
        }
        .m-menu nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .m-menu nav a {
          font-family: var(--font-assistant), var(--font-rubik), sans-serif;
          font-size: 17px; font-weight: 600;
          color: var(--ink); text-decoration: none;
          padding: 14px 8px;
          border-radius: 8px;
          min-height: 48px;
          display: flex; align-items: center;
          transition: background 0.15s ease;
        }
        .m-menu nav a:active { background: rgba(31, 39, 49, 0.06); }
        .m-menu-cta {
          margin-top: 10px;
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px;
          font-family: var(--font-assistant), var(--font-rubik), sans-serif;
          font-size: 15px; font-weight: 700;
          color: #fff; background: var(--sage);
          padding: 14px 22px; border-radius: 999px;
          text-decoration: none;
          min-height: 48px;
          box-shadow: 0 6px 18px -6px rgba(134, 162, 150, 0.55);
        }

        /* ═════════════════════════════════════════════════════════
           MOBILE BOTTOM BAR (<768px) — HTML/CSS
           ═════════════════════════════════════════════════════════ */
        .m-bottombar {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          flex-direction: column;
          gap: 14px;
          padding: 14px 18px 18px;
          z-index: 5;
          background: #f1e5d3;
          border-top: 1px solid rgba(31, 39, 49, 0.06);
        }
        .m-bb-categories {
          display: flex;
          justify-content: space-between;
          gap: 8px;
        }
        .m-bb-cat {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: var(--ink);
        }
        .m-bb-icon {
          width: 38px; height: 38px;
          display: inline-flex; align-items: center; justify-content: center;
          color: var(--ink);
        }
        .m-bb-label {
          font-family: var(--font-assistant), sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: var(--ink);
          text-align: center;
          line-height: 1.2;
        }
        .m-bb-brands {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid rgba(31, 39, 49, 0.12);
        }
        .m-bb-mandarina {
          font-family: var(--font-italiana), serif;
          font-size: 14px;
          letter-spacing: 0.18em;
          color: var(--ink);
        }
        .m-bb-toptik {
          font-family: var(--font-italiana), serif;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: var(--ink);
        }
      `}</style>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.488" />
    </svg>
  );
}
