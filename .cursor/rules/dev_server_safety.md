---
alwaysApply: true
---

# 🛡️ כללי בטיחות שרת פיתוח Next.js

> **חובה לקרוא ולציית בכל פעולה שמערבת את שרת הפיתוח (`npm run dev`).**
> אי-ציות גורם לקריסת השרת ולשגיאות `Internal Server Error` / `ENOENT build-manifest.json`.

---

## ❌ פעולות אסורות בזמן ש-dev server רץ

| פעולה | למה זה קורס את השרת |
|--------|----------------------|
| `npm run build` | מוחק `.next/dev/` ובונה מחדש לפרודקשן → השרת מפסיד את ה-manifests שלו |
| `Remove-Item .next -Recurse -Force` | מוחק את כל הסטייט של השרת בזמן שהוא ניגש אליו |
| `next build` ישירות | אותו דבר כמו `npm run build` |
| `rm -rf .next` | אותו דבר |

## ✅ פעולות מותרות תמיד

- שמירת קבצי קוד — ה-HMR של Next.js יטען מחדש אוטומטית
- עריכת `.tsx`, `.ts`, `.css`, `.json` — Hot Module Replacement עובד
- `git add/commit/push` — לא נוגע ב-`.next/`
- `git pull` — אם משנה קוד, HMR יחיל

## 🔄 סדר פעולות נכון לאימות בנייה (build verification)

אם **חייבים** להריץ `npm run build`:

```powershell
# 1. עצור את השרת קודם
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | 
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

# 2. הרץ build
npm run build

# 3. הפעל מחדש את השרת
npm run dev
```

## 🚨 פתרון אם השרת קרס

```powershell
# 1. הרוג כל תהליך node
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. שחרר פורט 3000 אם תפוס
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | 
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }

# 3. נקה .next
Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue

# 4. הפעל מחדש
npm run dev
```

## 📋 כלל אצבע

**לאימות שינויי קוד:**
- ✅ HMR (אוטומטי כשיש dev server) — מספיק לרוב המקרים
- ✅ ReadLints על הקבצים שנערכו
- ⚠️ `npm run build` רק אם נדרש לאימות פרודקשן והשרת **כבוי**

**הכלל המרכזי:** אל תיגע ב-`.next/` כשהשרת רץ. לעולם.
