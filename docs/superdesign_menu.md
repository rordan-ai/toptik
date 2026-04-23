# superdesign Menu — מדריך פקודות עיצוב

> בנוי מבוסס [pbakaus/impeccable](https://github.com/pbakaus/impeccable) (Apache 2.0).
> כל הפקודות מתחילות בסלאש: `/<command>`. לרובן יש `argument-hint` (יעד/הקשר).

---

## 0. סקיל ראשי

### `/superdesign_menu` (לשעבר `/impeccable`)
**תפקיד:** סקיל בסיס. מכיל עקרונות עיצוב, anti-patterns, Context Gathering Protocol.
**חובה:** לפני כל פקודת עיצוב יש להריץ context gathering.

#### 3 מצבי הפעלה:

| ארגומנט | תפקיד | מתי |
|---|---|---|
| **`craft`** | Shape → Build בפעולה אחת. ראיון discovery + תכנון + מימוש קוד | פיצ'ר חדש מאפס |
| **`teach`** | הגדרת design context לפרויקט. סורק קוד, שואל שאלות UX, יוצר `.impeccable.md` | פעם אחת בתחילת הפרויקט |
| **`extract`** | חילוץ קומפוננטות + design tokens חוזרים אל ה-design system | אחרי בנייה — לכנס שאריות |

**שימוש:** `/superdesign_menu craft <feature>` / `/superdesign_menu teach` / `/superdesign_menu extract <target>`

---

## 1. פקודות תכנון (Pre-Code)

### `/shape [feature]`
**תפקיד:** Discovery interview מובנה → design brief לפני כתיבת קוד כלשהו.
**פלט:** brief שניתן להעביר ל-`/superdesign_menu craft` או לכל implementation skill.
**מתי:** התחלת פיצ'ר, צורך בכיוון עיצובי לפני קוד.

---

## 2. פקודות חיזוק (Amplify)

### `/bolder [target]`
**תפקיד:** הגברת עוצמה ויזואלית. עיצוב גנרי/בטוח/חסר אישיות → אופי.
**מתי:** "looks bland", "too safe", "lacks personality", "needs more impact".
**אזהרה מובנית:** לא ליפול ל-AI tropes (cyan/purple gradients, glassmorphism, neon).

### `/colorize [target]`
**תפקיד:** הוספת צבע אסטרטגי לעיצוב מונוטוני/אפור/מחוסר עניין ויזואלי.
**מתי:** "looks gray", "dull", "lacks warmth", "needs more vibrant palette".
**אסוף:** `existing brand colors`.

### `/delight [target]`
**תפקיד:** הוספת רגעי שמחה, אישיות, micro-interactions בלתי צפויים.
**מתי:** "add polish", "personality", "make it fun", "memorable".
**אסוף:** `domain appropriateness` (playful vs professional vs quirky vs elegant).

### `/animate [target]`
**תפקיד:** הוספת אנימציות תכליתיות, transitions, motion design למימוש קיים.
**מתי:** "add animation", "transitions", "micro-interactions", "make UI feel alive".
**אסוף:** `performance constraints`.

### `/overdrive [target]`
**תפקיד:** דחיפת UI מעבר לקונבנציונלי — shaders, spring physics, scroll-driven reveals, 60fps.
**מתי:** "wow", "impress", "go all-out", "extraordinary", "flagship feature".

---

## 3. פקודות ריסון (Restrain)

### `/quieter [target]`
**תפקיד:** הורדת עוצמה. עיצוב רועש/אגרסיבי/garish → מעודן.
**מתי:** "too bold", "too loud", "overwhelming", "calmer aesthetic".

### `/distill [target]`
**תפקיד:** הסרת מורכבות מיותרת. Strip to essence. Simplification.
**מתי:** "simplify", "declutter", "reduce noise", "make cleaner", "more focused".

---

## 4. פקודות תיקון/שיפור (Fix)

### `/layout [target]`
**תפקיד:** שיפור spacing, visual rhythm, hierarchy, alignment, grid composition.
**מתי:** "layout feels off", "spacing issues", "weak hierarchy", "crowded UI", "alignment problems".
**אנטי-pattern:** monotonous grids, identical spacing everywhere.

### `/typeset [target]`
**תפקיד:** טיפוגרפיה — fonts, hierarchy, weight, sizing, readability.
**מתי:** "fonts", "type", "readability", "text hierarchy", "sizing off", "polished typography".
**שים לב:** דוחה fonts בנאליים (Inter, Fraunces, DM Sans וכו') — מאלץ לבחור מבוסס brand voice.

### `/clarify [target]`
**תפקיד:** שיפור UX writing — labels, error messages, microcopy, instructions.
**מתי:** "confusing text", "unclear labels", "bad error messages", "hard-to-follow", "better UX writing".
**אסוף:** `audience technical level` + `users' mental state`.

### `/polish [target]` ⭐
**תפקיד:** פאס איכות סופי לפני shipping. תיקון alignment, spacing, עקביות, micro-details.
**מתי:** "polish", "finishing touches", "pre-launch review", "looks off", "good → great".
**אסוף:** `quality bar` (MVP vs flagship).

**מה כולל (9 ממדים):**
1. **Visual alignment & spacing** — pixel-perfect, baseline grid, optical alignment
2. **Typography refinement** — hierarchy, line length 65-75ch, kerning, widows/orphans
3. **Color & contrast** — WCAG, design tokens, no pure black/white, tinted neutrals
4. **Interaction states** — default/hover/focus/active/disabled/loading/error/success (כולן!)
5. **Micro-interactions & transitions** — 150-300ms, ease-out-quart/quint/expo, 60fps
6. **Content & copy** — terminology, capitalization, punctuation עקביים
7. **Icons & images** — סגנון אחיד, אלט, retina, no layout shift
8. **Forms & inputs** — labels, validation, tab order, required indicators
9. **Edge cases** — loading, empty, error, success, long content, no content, offline

**Checklist:** 19 בנקודות בדיקה לפני "done".
**אזהרה:** אסור לטפח לפני שהפיצ'ר פונקציונלי.

---

## 5. פקודות Production-Readiness

### `/adapt [target] [context]`
**תפקיד:** התאמה למסכים/מכשירים/הקשרים — breakpoints, fluid layouts, touch targets.
**מתי:** "responsive design", "mobile layouts", "breakpoints", "viewport adaptation", "cross-device".
**הקשרים:** mobile / tablet / print / TV / kiosk / smartwatch.

### `/harden [target]`
**תפקיד:** הפיכת UI ל-production-ready — error handling, empty states, onboarding, i18n, text overflow, edge cases.
**מתי:** "harden", "production-ready", "edge cases", "error states", "empty states", "onboarding", "overflow", "i18n".

### `/optimize [target]`
**תפקיד:** אבחון + תיקון בעיות ביצועים — load time, rendering, animations, images, bundle size.
**מתי:** "slow", "laggy", "janky", "performance", "bundle size", "load time".

---

## 6. פקודות בקרת איכות (QA)

### `/audit [area]`
**תפקיד:** בדיקות טכניות מקיפות — accessibility / performance / theming / responsive / anti-patterns.
**פלט:** דוח מנוקד עם דירוג חומרה **P0 / P1 / P2 / P3** + תוכנית פעולה.
**מתי:** "accessibility check", "performance audit", "technical quality review".

### `/critique [area]` ⭐
**תפקיד:** סקירה UX מקצועית — visual hierarchy, IA, emotional resonance, cognitive load.
**כלי תוכן:**
- **Quantitative scoring** עם heuristics (`reference/heuristics-scoring.md`)
- **Persona-based testing** (`reference/personas.md`) — בוחר 2-3 personas + 1-2 מבוססות פרויקט
- **AI Slop Detection** — בדיקה מול כל ה-DON'Ts
- **Cognitive load analysis** (`reference/cognitive-load.md`)
- **Live overlay tool:** `npx impeccable live` — מסמן בעיות בדפדפן
- **CLI:** `npx impeccable --json [--fast] [target]`

---

## 7. Workflow מומלץ — שילוב פקודות

### א. פרויקט חדש (Greenfield)
```
/superdesign_menu teach          → context (פעם אחת בתחילת פרויקט)
/shape <feature>                  → design brief
/superdesign_menu craft           → bot build
/audit + /critique               → QA
/polish + /harden                 → ליטוש לקראת shipping
```

### ב. שיפור פיצ'ר קיים
```
/critique <feature>              → אבחון
[בחר מהפקודות הרלוונטיות לפי הממצאים]
/polish                          → ליטוש סופי
```

### ג. עיצוב נראה גנרי / "AI slop"
```
/critique → AI Slop Detection
/distill                         → להפשיט
/bolder או /typeset או /colorize → להוסיף אופי ייחודי
/polish
```

### ד. הוספת רגעי קסם
```
/animate                         → motion
/delight                         → micro-interactions
/overdrive                       → דחיפה מעבר (לפיצ'רים flagship)
```

### ה. Pre-Launch
```
/audit (P0/P1)                   → תיקוני חובה
/harden                          → edge cases
/adapt                           → responsive
/optimize                        → ביצועים
/polish                          → ליטוש סופי
```

---

## 8. Reference Files (במידע משלים)

תיקיית `superdesign_menu/reference/`:
- `typography.md` — type scales, OpenType, web font loading
- `color-and-contrast.md` — OKLCH, palettes, accessibility
- `spatial-design.md` — grids, container queries, optical adjustments
- `motion-design.md` — timing, easing, reduced motion
- `interaction-design.md` — forms, focus, loading patterns
- `responsive-design.md` — mobile-first, fluid, container queries
- `ux-writing.md` — labels, errors, empty states
- `craft.md` — craft mode flow
- `extract.md` — extract mode flow

תיקיית `critique/reference/`:
- `cognitive-load.md`
- `heuristics-scoring.md`
- `personas.md`

---

## 9. Anti-Patterns (תזכורת מהירה)

**אסור (Absolute Bans):**
- `border-left/right > 1px` כאקסנט צבעוני (פסיכי-AI tell #1)
- `background-clip: text` עם gradient (gradient text)

**הימנע:**
- Inter / Fraunces / DM Sans / Plus Jakarta וכל הרשימה השחורה
- Cyan-on-dark, purple-to-blue gradients, neon accents
- Pure black/white (תמיד tinted)
- Cards inside cards
- Identical card grids
- Hero metric layout template
- Bounce/elastic easing (מיושן)
- Center alignment ל-everything
- Modals כברירת מחדל

---

## סך הכל: **20 פקודות**

| קטגוריה | פקודות |
|---|---|
| ראשי | `/superdesign_menu` (3 מצבים: craft/teach/extract) |
| תכנון | `/shape` |
| חיזוק | `/bolder`, `/colorize`, `/delight`, `/animate`, `/overdrive` |
| ריסון | `/quieter`, `/distill` |
| תיקון | `/layout`, `/typeset`, `/clarify`, `/polish` |
| Production | `/adapt`, `/harden`, `/optimize` |
| QA | `/audit`, `/critique` |
