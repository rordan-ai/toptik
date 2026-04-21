import Image from "next/image";

const navItems = [
  { href: "#deals", label: "מבצעים" },
  { href: "#about", label: "אודותינו" },
  { href: "#stores", label: "סניפים" },
];

export default function Home() {
  return (
    <div className="page">
      <div className="stage" data-variant="v1">
        {/* Hero image fills the stage — high quality, no Next.js compression */}
        <Image
          src="/hero-toptik.png"
          alt="TopTik Hero"
          fill
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className="hero-img"
        />

        {/* Top scrim — softens top so navbar copy is readable */}
        <div className="scrim-top" aria-hidden />
        <div className="warm-tone" aria-hidden />
        <div className="halation" aria-hidden />
        <div className="vignette" aria-hidden />

        {/* ─── NAVBAR ─── */}
        <header className="navbar">
          {/* Brand left */}
          <div className="brand">
            <div className="title">TOPTIK COLLECTION</div>
            <div className="slogan">Move in Style. Travel with Purpose.</div>
          </div>

          {/* Hebrew nav RTL */}
          <nav aria-label="Primary" dir="rtl">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          {/* WhatsApp CTA */}
          <a
            className="cta"
            href="https://wa.me/"
            target="_blank"
            rel="noopener"
            dir="rtl"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.488" />
            </svg>
            דברו איתנו בוואטסאפ
          </a>
        </header>
      </div>

      {/* ─── INLINE STAGE STYLES ─── */}
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
          background: #111;
          box-shadow: 0 30px 80px rgba(0,0,0,0.3);
        }

        .hero-img {
          object-fit: cover;
          object-position: center;
          filter:
            contrast(var(--contrast))
            saturate(var(--sat))
            brightness(var(--brightness));
          /* Crisp rendering hints */
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          transform: translateZ(0); /* GPU layer for sharper compositing */
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

        /* ===== NAVBAR ===== */
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

        .navbar .cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-assistant), var(--font-rubik), sans-serif;
          font-size: clamp(12px, 1.05vw, 15px);
          font-weight: 700;
          color: #fff;
          background: var(--sage);
          padding: 12px 22px;
          border-radius: 999px;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 6px 18px -6px rgba(134,162,150,0.55);
          transition: background .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        .navbar .cta:hover {
          background: var(--sage-dark);
          box-shadow: 0 8px 22px -6px rgba(134,162,150,0.7);
          transform: translateY(-1px);
        }

        @media (max-width: 720px) {
          .stage { aspect-ratio: 4 / 5; }
          .navbar { height: 14%; padding: 0 14px; }
          .navbar nav { display: none; }
          .navbar .cta { padding: 8px 12px; font-size: 11px; }
          .brand .title { font-size: 15px; letter-spacing: 0.16em; }
          .brand .slogan { font-size: 13px; }
        }
      `}</style>
    </div>
  );
}
