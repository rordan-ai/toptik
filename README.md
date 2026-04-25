# TOPTIK - Landing Page

דף נחיתה חכם לפרויקט TOPTIK.

## טכנולוגיות

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **React 19**

## סביבות

| Branch | סביבה | URL |
|--------|--------|-----|
| `master` | Production | TBD |
| `dev` | Development / Preview | Vercel Preview (auto) |

## עבודה שוטפת

```bash
# תמיד על dev
git checkout dev

# הרצה מקומית
npm run dev

# אחרי שינויים
git add -A
git commit -m "description"
git push origin dev
```

## סקריפטים

```bash
npm run dev      # שרת פיתוח
npm run build    # בניה לפרודקשן
npm run start    # הרצת build
npm run lint     # בדיקת קוד
npm run verify   # lint + build (שער איכות)
npm run backup:bundle  # יצירת git bundle מלא
```

## גיבוי ושחזור

- מסמך סטנדרט: `docs/backup-and-recovery.md`
- לפני שינוי גדול/דיפלוי: להריץ `npm run verify`, לבצע commit+push, וליצור tag גיבוי.

## Rollback מהיר לקרוסלה

- משתנה בקרה: `NEXT_PUBLIC_ENABLE_CAROUSEL`
- `true` (ברירת מחדל): Home מציג CTA לקטלוג ו-`/carousel` פעיל.
- `false`: CTA מוסתר, כפתור קטלוג במובייל מוסתר, ו-`/carousel` מפנה אוטומטית ל-`/`.

## ייבוא מוצר לפי מק"ט (Mandarina Duck)

- באדמין ניתן להזין מספר קטלוגי וללחוץ ייבוא אוטומטי.
- הייבוא מושך תמונות מהמקור, מעלה עותק ל-`carousel-media` ב-Supabase, ויוצר מוצר חדש בטיוטה.
- לאחר ייבוא יש ללחוץ `שמור הכל` כדי לקבע את המוצר ב-DB.
