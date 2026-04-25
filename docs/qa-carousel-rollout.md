# QA + Rollback Evidence (Carousel)

תאריך: 2026-04-23

## Cross-device screenshots

נוצרו screenshots בפועל:

- `qa-home-320x740.png`
- `qa-home-375x812.png`
- `qa-home-414x896.png`
- `qa-home-1920x1080.png`
- `qa-carousel-1920x1080.png`

אימות מידות קבצים:

- `qa-home-320x740.png` -> `320x740`
- `qa-home-375x812.png` -> `375x812`
- `qa-home-414x896.png` -> `414x896`
- `qa-home-1920x1080.png` -> `1920x1080`
- `qa-carousel-1920x1080.png` -> `1920x1080`

## Rollback feature flag

משתנה:

- `NEXT_PUBLIC_ENABLE_CAROUSEL`

בדיקות שבוצעו:

1. מצב `false`:
   - Home: CTA `כניסה לקטלוג` מוסתר.
   - `/carousel`: מחזיר `307` ומפנה ל-`/`.
2. מצב `true`:
   - Home: CTA מופיע.
   - `/carousel`: נגיש (`200`).

## איכות קוד

- `npm run verify` -> Passed
- `eslint` -> Passed
- `next build` -> Passed
