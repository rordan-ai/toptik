import Image from "next/image";
import MobileLayer from "./MobileLayer";

const navItems = [
  { href: "#deals", label: "מבצעים" },
  { href: "#about", label: "אודותינו" },
  { href: "#stores", label: "סניפים" },
];

export default function Home() {
  return (
    <div className="page">
      <div className="stage" data-variant="v1">
        {/* Hero — desktop landscape (1366x666) */}
        <Image
          src="/hero-clean.png"
          alt="TopTik Hero"
          fill
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className="hero-img hero-desktop"
        />

        {/* Hero — mobile portrait (different artwork, only on mobile) */}
        <Image
          src="/hero-mobile.png"
          alt="TopTik Hero Mobile"
          fill
          quality={100}
          unoptimized
          sizes="100vw"
          className="hero-img hero-mobile"
        />

        {/* Top scrim */}
        <div className="scrim-top" aria-hidden />
        <div className="warm-tone" aria-hidden />
        <div className="halation" aria-hidden />
        <div className="vignette" aria-hidden />

        {/* ─── TOP NAVBAR (restored to original) ─── */}
        <header className="navbar">
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

          <a
            className="cta-icon"
            href="https://wa.me/"
            target="_blank"
            rel="noopener"
            aria-label="דברו איתנו בוואטסאפ"
          >
            <Image
              src="/whatsapp.png"
              alt="WhatsApp"
              width={1024}
              height={1024}
              unoptimized
              priority
            />
          </a>
        </header>

        {/* ─── BOTTOM BAR (separate image - now editable) ─── */}
        <div className="bottom-bar">
          <Image
            src="/bottom-bar.png"
            alt="TopTik categories: חומרי גלם איכותיים, פונקציונליות חכמה, עיצוב איטלקי, MANDARINA DUCK, TOPTIK"
            fill
            quality={100}
            unoptimized
            sizes="100vw"
            className="bottom-bar-img"
            priority
          />
          {/* Layer 1: cream rect covers baked TOPTIK */}
          <div className="bb-toptik-overlay" />
          {/* Layer 2: transparent enlarged logo (above all, extends upward) */}
          <div className="bb-toptik-logo">
            <Image
              src="/toptik-logo-trans.png"
              alt="TopTik"
              width={380}
              height={150}
              unoptimized
              priority
            />
          </div>
        </div>

        {/* ═══ MOBILE LAYER (<768px only - hidden on desktop via CSS) ═══ */}
        <MobileLayer />
      </div>

      <style>{`
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
          box-shadow: 0 30px 80px rgba(0,0,0,0.3);
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

        .scrim-top {
          position: absolute; inset: 0 0 auto 0;
          height: 42%;
          pointer-events: none;
          background:
            radial-gradient(ellipse 55% 90% at 26% 18%,
              rgba(255,252,246, calc(var(--scrim-strength) * 0.75)) 0%,
              rgba(255,252,246, calc(var(--scrim-strength) * 0.30)) 35%,
              rgba(255,252,246, 0) 70%);
          mix-blend-mode: screen;
        }
        .warm-tone {
          position: absolute; inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse 90% 60% at 70% 40%,
            rgba(255, 196, 120, calc(var(--warm) * 1.2)) 0%,
            rgba(255, 196, 120, 0) 70%);
          mix-blend-mode: soft-light;
        }
        .halation {
          position: absolute; inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 30% 40% at 60% 55%, rgba(255,200,90, calc(var(--halation)*0.45)) 0%, transparent 60%),
            radial-gradient(ellipse 55% 35% at 50% 15%, rgba(255,220,160, calc(var(--halation)*0.35)) 0%, transparent 70%);
          mix-blend-mode: screen;
        }
        .vignette {
          position: absolute; inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 80% 70% at 50% 50%, transparent 55%, rgba(0,0,0, calc(var(--vignette) * 0.55)) 100%);
        }

        /* ===== TOP NAVBAR (RESTORED to original Figma spec) ===== */
        .navbar {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 11.5%;
          display: flex;
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
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          line-height: 1.02;
          color: var(--ink);
          user-select: none;
        }
        .brand .title {
          font-family: var(--font-italiana), var(--font-playfair), serif;
          font-weight: 400;
          letter-spacing: 0.22em;
          font-size: clamp(16px, 2.2vw, 28px);
          color: var(--ink);
          white-space: nowrap;
        }
        .brand .slogan {
          font-family: var(--font-great-vibes), cursive;
          font-size: clamp(13px, 1.5vw, 19px);
          color: var(--ink-soft);
          margin-top: 2px;
          white-space: nowrap;
          line-height: 1.1;
        }

        .navbar nav {
          display: flex;
          align-items: center;
          gap: clamp(14px, 2.2vw, 30px);
        }
        .navbar nav a {
          font-family: var(--font-assistant), var(--font-rubik), sans-serif;
          font-size: clamp(13px, 1.15vw, 16px);
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--ink);
          text-decoration: none;
          position: relative;
          padding: 6px 2px;
          transition: color .2s ease;
        }
        .navbar nav a::after {
          content: "";
          position: absolute; left: 0; right: 0; bottom: 0;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform .25s ease;
        }
        .navbar nav a:hover { color: #8a6a2d; }
        .navbar nav a:hover::after { transform: scaleX(1); }

        /* WhatsApp icon-only CTA — replaces long pill button */
        .navbar .cta-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: clamp(40px, 3vw, 48px);
          height: clamp(40px, 3vw, 48px);
          border-radius: 50%;
          text-decoration: none;
          transition: transform .2s ease, filter .2s ease;
        }
        .navbar .cta-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
        .navbar .cta-icon:hover {
          transform: translateY(-1px) scale(1.05);
          filter: brightness(1.08);
        }

        /* ===== BOTTOM BAR =====
           Strategy: container is 10% TALLER than image natural aspect (1368/102).
           New aspect: 1368 / (102 × 1.1) = 1368 / 112.2.
           Background = exact sampled cream (#f1e5d3) of the bar = visually continuous.
           object-fit:contain keeps items at original size + center-aligns vertically
           → equal cream space above and below bar items = perfectly centered items. */
        .bottom-bar {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          aspect-ratio: 1368 / 112.2;
          background: #f1e5d3;
          z-index: 5;
          overflow: hidden;
        }
        .bottom-bar-img {
          object-fit: contain;
          /* Items in source image are pinned to top (4px top padding vs 14px bottom).
             Push image to BOTTOM of container → all extra cream appears above
             → final result: 14px above items + 14px below items = perfectly centered */
          object-position: center bottom;
          image-rendering: -webkit-optimize-contrast;
        }
        /* WRAPPING TECHNIQUE — bar/elements stay original; ONLY logo enlarges.
           Cover (cream) is the ORIGINAL 17% area that hides baked TOPTIK.
           Logo IMG inside is scaled 2× via transform with overflow:visible →
           it grows upward into hero space (transparent PNG, no visual conflict)
           and slightly wider but anchored right so it doesn't reach MANDARINA. */
        /* Cream cover (stays at original 17% — hides baked TOPTIK exactly) */
        .bb-toptik-overlay {
          position: absolute;
          right: 1.2%;
          top: 14%;
          bottom: 6%;
          width: 17%;
          background: #f1e5d3;
          z-index: 5;
        }
        /* Scaled logo — separate layer ABOVE both bar + mandarina,
           anchored RIGHT (own dedicated area, no leftward growth into mandarina).
           Grows ONLY upward into hero zone (transparent PNG). */
        .bb-toptik-logo {
          position: absolute;
          right: 1.2%;
          bottom: 4%;
          /* Doubled visual size of the original 17% cover area */
          width: 17%;
          height: 200%;          /* = 2× bar height, extends UP into hero */
          z-index: 10;           /* above MANDARINA (which is in baked image at z<5) */
          pointer-events: none;
        }
        .bb-toptik-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: right bottom;   /* anchor logo to right-bottom of its area */
        }

        /* Lowered breakpoint: nav hides only on real mobile (<560px),
           not on narrow desktop preview windows */
        @media (max-width: 560px) {
          .stage { aspect-ratio: 4 / 5; }
          .navbar { height: 14%; padding: 0 14px; }
          .navbar nav { display: none; }
          .navbar .cta-icon { width: 36px; height: 36px; }
          .brand .title { font-size: 15px; letter-spacing: 0.16em; }
          .brand .slogan { font-size: 13px; }
        }
      `}</style>
    </div>
  );
}
