"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CarouselPayload, TransitionMode } from "@/lib/carousel/types";
import { fallbackCarouselPayload } from "@/lib/carousel/fallback-data";

const STORAGE_KEY = "toptik_admin_token";
type ImportFeedbackTone = "info" | "success" | "error";
type ImportPreview = {
  id: string;
  title: string;
  coverImagePath: string;
  catalogNumber: string;
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const [payload, setPayload] = useState<CarouselPayload>(fallbackCarouselPayload);
  const [status, setStatus] = useState<string>("טוען...");
  const [isSaving, setIsSaving] = useState(false);
  const [catalogNumber, setCatalogNumber] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [itemCatalogInputs, setItemCatalogInputs] = useState<Record<string, string>>({});
  const [itemImportingMap, setItemImportingMap] = useState<Record<string, boolean>>({});
  const [importFeedback, setImportFeedback] = useState<{
    tone: ImportFeedbackTone;
    message: string;
  } | null>(null);
  const [importPreviews, setImportPreviews] = useState<ImportPreview[]>([]);

  function resolveErrorMessage(error: unknown, fallback: string) {
    if (error instanceof Error && error.message) return error.message;
    return fallback;
  }

  const loadData = useCallback(async (activeToken: string) => {
    try {
      setStatus("טוען נתוני אדמין...");
      const res = await fetch("/api/admin/carousel", {
        headers: { "x-admin-token": activeToken },
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unauthorized or load failed");
      }
      const data = await res.json();
      setPayload(data);
      setStatus("מחובר");
      setAuthReady(true);
    } catch (error) {
      setStatus(resolveErrorMessage(error, "טוקן לא תקין או חוסר הרשאות"));
      setAuthReady(false);
    }
  }, []);

  useEffect(() => {
    const savedToken = window.localStorage.getItem(STORAGE_KEY) || "";
    setToken(savedToken);
    setAuthReady(Boolean(savedToken));
    if (!savedToken) {
      setStatus("הזן טוקן אדמין כדי להתחבר");
      return;
    }
    void loadData(savedToken);
  }, [loadData]);

  function updateItemField(
    index: number,
    field: "title" | "description" | "catalogNumber" | "displayOrder" | "isActive",
    value: string | number | boolean,
  ) {
    setPayload((current) => {
      const next = structuredClone(current);
      const item = next.items[index];
      if (field === "displayOrder") item.displayOrder = Number(value);
      else if (field === "isActive") item.isActive = Boolean(value);
      else if (field === "catalogNumber") {
        const normalized = String(value).trim();
        item.catalogNumber = normalized ? normalized : null;
      }
      else if (field === "description") item.description = String(value);
      else item.title = String(value);
      return next;
    });
  }

  function addItem() {
    setPayload((current) => {
      const next = structuredClone(current);
      const itemId = crypto.randomUUID();
      next.items.push({
        id: itemId,
        title: "מוצר חדש",
        description: "",
        catalogNumber: null,
        sourceUrl: null,
        coverImagePath: "/hero-web-airport.png",
        displayOrder: next.items.length + 1,
        isActive: true,
        angles: [
          {
            id: crypto.randomUUID(),
            itemId,
            angleKey: "front",
            imagePath: "/hero-web-airport.png",
            angleOrder: 1,
          },
        ],
      });
      return next;
    });
  }

  function removeItem(itemId: string) {
    setPayload((current) => ({
      ...current,
      items: current.items.filter((item) => item.id !== itemId),
    }));
  }

  async function uploadFile(file: File, folder: string): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "x-admin-token": token },
      body: formData,
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      throw new Error(data?.error || "Upload failed");
    }
    const data = await res.json();
    return data.publicUrl as string;
  }

  async function onCoverUpload(itemIndex: number, file: File) {
    try {
      setStatus("מעלה cover...");
      const item = payload.items[itemIndex];
      const url = await uploadFile(file, `items/${item.id}/cover`);
      setPayload((current) => {
        const next = structuredClone(current);
        next.items[itemIndex].coverImagePath = url;
        return next;
      });
      setStatus("cover הועלה");
    } catch (error) {
      setStatus(resolveErrorMessage(error, "שגיאת העלאה"));
    }
  }

  async function onSave() {
    try {
      setIsSaving(true);
      setStatus("שומר...");
      const res = await fetch("/api/admin/carousel", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Save failed");
      }
      setStatus("נשמר בהצלחה");
      setImportFeedback({
        tone: "success",
        message: "השינויים נשמרו בהצלחה.",
      });
    } catch (error) {
      setStatus(resolveErrorMessage(error, "שגיאת שמירה"));
      setImportFeedback({
        tone: "error",
        message: resolveErrorMessage(error, "שגיאת שמירה"),
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function onImportByCatalog() {
    if (!catalogNumber.trim()) {
      setStatus("יש להזין מספר קטלוגי");
      setImportFeedback({
        tone: "error",
        message: "יש להזין מספר קטלוגי ליבוא.",
      });
      return;
    }

    try {
      setIsImporting(true);
      setStatus("מייבא מוצר לפי מספר קטלוגי...");
      setImportFeedback({
        tone: "info",
        message: "מתבצע ייבוא, נא להמתין...",
      });
      const res = await fetch("/api/admin/import/mandarina", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({ catalogNumber }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Import failed");
      }

      const data = (await res.json()) as {
        item: CarouselPayload["items"][number];
        source: { catalogNumber: string; importedImages: number };
      };

      setPayload((current) => {
        const next = structuredClone(current);
        const existingIndex = next.items.findIndex((item) => {
          const byCatalogNumber =
            (item.catalogNumber ?? "").trim().toLowerCase() ===
            (data.source.catalogNumber ?? "").trim().toLowerCase();
          const byCatalogPath = item.angles.some((angle) =>
            angle.imagePath.includes(`/imports/mandarina/${data.source.catalogNumber}/`),
          );
          const byTitle = item.title.trim().toLowerCase() === data.item.title.trim().toLowerCase();
          return byCatalogNumber || byCatalogPath || byTitle;
        });

        if (existingIndex >= 0) {
          const existing = next.items[existingIndex];
          next.items[existingIndex] = {
            ...existing,
            title: data.item.title,
            description: data.item.description,
            catalogNumber: data.item.catalogNumber ?? data.source.catalogNumber,
            sourceUrl: data.item.sourceUrl ?? null,
            coverImagePath: data.item.coverImagePath,
            angles: data.item.angles.map((angle) => ({
              ...angle,
              itemId: existing.id,
            })),
          };
          return next;
        }

        const maxOrder = next.items.reduce((max, item) => Math.max(max, item.displayOrder), 0);
        next.items.push({
          ...data.item,
          displayOrder: maxOrder + 1,
        });
        return next;
      });

      setStatus(
        `ייבוא הושלם: ${data.source.catalogNumber} עם ${data.source.importedImages} תמונות. לחץ "שמור הכל" לקיבוע.`,
      );
      setImportFeedback({
        tone: "success",
        message: `הייבוא הצליח: ${data.source.catalogNumber} (${data.source.importedImages} תמונות). עכשיו לחץ שמור הכל.`,
      });
      setImportPreviews((current) => [
        {
          id: crypto.randomUUID(),
          title: data.item.title,
          coverImagePath: data.item.coverImagePath,
          catalogNumber: data.source.catalogNumber,
        },
        ...current,
      ].slice(0, 8));
      setCatalogNumber("");
    } catch (error) {
      const message = resolveErrorMessage(error, "שגיאת ייבוא לפי מספר קטלוגי");
      setStatus(message);
      setImportFeedback({
        tone: "error",
        message,
      });
    } finally {
      setIsImporting(false);
    }
  }

  async function onImportIntoExistingItem(itemIndex: number, itemId: string) {
    const itemCatalogNumber = (itemCatalogInputs[itemId] || "").trim();
    if (!itemCatalogNumber) {
      setStatus("יש להזין מספר קטלוגי ליבוא למוצר");
      setImportFeedback({
        tone: "error",
        message: "יש להזין מספר קטלוגי ליבוא למוצר זה.",
      });
      return;
    }

    try {
      setItemImportingMap((current) => ({ ...current, [itemId]: true }));
      setStatus(`מייבא למוצר קיים: ${itemCatalogNumber}...`);
      setImportFeedback({
        tone: "info",
        message: `מתבצע ייבוא למוצר קיים (${itemCatalogNumber})...`,
      });

      const res = await fetch("/api/admin/import/mandarina", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({ catalogNumber: itemCatalogNumber, targetItemId: itemId }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Import to existing item failed");
      }

      const data = (await res.json()) as {
        item: CarouselPayload["items"][number];
        source: { catalogNumber: string; importedImages: number };
      };

      setPayload((current) => {
        const next = structuredClone(current);
        const existing = next.items[itemIndex];
        next.items[itemIndex] = {
          ...existing,
          title: data.item.title,
          description: data.item.description,
          catalogNumber: data.item.catalogNumber ?? data.source.catalogNumber,
          sourceUrl: data.item.sourceUrl ?? null,
          coverImagePath: data.item.coverImagePath,
          angles: data.item.angles.map((angle) => ({
            ...angle,
            itemId: existing.id,
          })),
        };
        return next;
      });

      setItemCatalogInputs((current) => ({ ...current, [itemId]: "" }));
      setStatus(
        `ייבוא למוצר קיים הושלם: ${data.source.catalogNumber} עם ${data.source.importedImages} תמונות. לחץ "שמור הכל".`,
      );
      setImportFeedback({
        tone: "success",
        message: `עודכן מוצר קיים (${data.source.catalogNumber}) עם ${data.source.importedImages} תמונות. לחץ שמור הכל.`,
      });
      setImportPreviews((current) => [
        {
          id: crypto.randomUUID(),
          title: data.item.title,
          coverImagePath: data.item.coverImagePath,
          catalogNumber: data.source.catalogNumber,
        },
        ...current,
      ].slice(0, 8));
    } catch (error) {
      const message = resolveErrorMessage(error, "שגיאת ייבוא למוצר קיים");
      setStatus(message);
      setImportFeedback({
        tone: "error",
        message,
      });
    } finally {
      setItemImportingMap((current) => ({ ...current, [itemId]: false }));
    }
  }

  const sortedItems = useMemo(
    () => [...payload.items].sort((a, b) => a.displayOrder - b.displayOrder),
    [payload.items],
  );

  return (
    <main className="admin-page">
      <header className="admin-header">
        <h1>TOPTIK Admin</h1>
        <Link href="/" className="admin-back-link">
          חזרה לבית
        </Link>
      </header>

      <section className="admin-auth">
        <label>
          Admin Token
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="הזן ADMIN_PANEL_TOKEN"
          />
        </label>
        <button
          onClick={() => {
            window.localStorage.setItem(STORAGE_KEY, token);
            loadData(token);
          }}
        >
          התחבר
        </button>
        <div className="admin-status">{status}</div>
      </section>

      {authReady && (
        <>
          <section className="admin-settings">
            <h2>הגדרות דפדוף</h2>
            <label>
              מהירות autoplay (ms)
              <input
                type="number"
                min={1500}
                max={12000}
                value={payload.settings.autoplayMs}
                onChange={(e) =>
                  setPayload((current) => ({
                    ...current,
                    settings: { ...current.settings, autoplayMs: Number(e.target.value) },
                  }))
                }
              />
            </label>
            <label>
              סוג מעבר דף בית → קטלוג
              <select
                value={payload.settings.transitionMode}
                onChange={(e) =>
                  setPayload((current) => ({
                    ...current,
                    settings: {
                      ...current.settings,
                      transitionMode: e.target.value as TransitionMode,
                    },
                  }))
                }
              >
                <option value="shatter-particle">Shatter / Particle</option>
                <option value="curtain-fade">Curtain Fade</option>
              </select>
            </label>
          </section>

          <section className="admin-import">
            <h2>ייבוא אוטומטי מ-Mandarina Duck</h2>
            <div className="admin-import-prompt">הכנס מספר קטלוגי ליבוא</div>
            <div className="admin-import-row">
              <label className="admin-import-field">
                <span>מספר קטלוגי</span>
                <input
                  value={catalogNumber}
                  onChange={(e) => setCatalogNumber(e.target.value)}
                  placeholder="הכנס מספר קטלוגי ליבוא"
                />
              </label>
              <div className="admin-import-actions">
                <button onClick={onImportByCatalog} disabled={isImporting || isSaving}>
                  {isImporting ? "מייבא..." : "ייבא לפי מספר קטלוגי"}
                </button>
                <button className="admin-save-inline-btn" onClick={onSave} disabled={isSaving || isImporting}>
                  {isSaving ? "שומר..." : "שמור הכל"}
                </button>
              </div>
            </div>
            <p className="admin-import-note">
              דוגמה: <span dir="ltr">QMT32A74</span>. אחרי הייבוא לחץ &#34;שמור הכל&#34; כדי לקבע.
            </p>
            {importFeedback && (
              <div className={`admin-import-feedback admin-import-feedback-${importFeedback.tone}`}>
                {importFeedback.message}
              </div>
            )}
            {importPreviews.length > 0 && (
              <div className="admin-import-preview-list" aria-label="מוצרים שיובאו בהצלחה">
                {importPreviews.map((preview) => (
                  <div key={preview.id} className="admin-import-preview-item">
                    {/* preview thumb helps identify imported product quickly */}
                    <Image
                      src={preview.coverImagePath}
                      alt={preview.title}
                      width={52}
                      height={52}
                      className="admin-import-preview-image"
                    />
                    <div className="admin-import-preview-meta">
                      <div className="admin-import-preview-catalog">{preview.catalogNumber}</div>
                      <div className="admin-import-preview-title">{preview.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="admin-items">
            <div className="admin-items-head">
              <h2>מוצרים</h2>
              <button onClick={addItem}>הוסף מוצר</button>
            </div>

            {sortedItems.map((item) => {
              const itemIndex = payload.items.findIndex((row) => row.id === item.id);
              return (
                <article key={item.id} className="admin-item-card">
                  <div className="admin-item-head">
                    <h3>{item.title}</h3>
                    <button className="admin-danger-btn" onClick={() => removeItem(item.id)}>
                      מחק מוצר
                    </button>
                  </div>
                  <div className="admin-item-grid">
                    <label>
                      כותרת
                      <input
                        value={item.title}
                        onChange={(e) => updateItemField(itemIndex, "title", e.target.value)}
                      />
                    </label>
                    <label>
                      תיאור
                      <input
                        value={item.description ?? ""}
                        onChange={(e) => updateItemField(itemIndex, "description", e.target.value)}
                      />
                    </label>
                    <label>
                      מספר קטלוגי
                      <input
                        value={item.catalogNumber ?? ""}
                        onChange={(e) => updateItemField(itemIndex, "catalogNumber", e.target.value)}
                        placeholder="למשל: QMT32A74"
                      />
                    </label>
                    <label>
                      סדר תצוגה
                      <input
                        type="number"
                        value={item.displayOrder}
                        onChange={(e) => updateItemField(itemIndex, "displayOrder", Number(e.target.value))}
                      />
                    </label>
                    <label className="checkbox-line">
                      פעיל
                      <input
                        type="checkbox"
                        checked={item.isActive}
                        onChange={(e) => updateItemField(itemIndex, "isActive", e.target.checked)}
                      />
                    </label>
                    <label>
                      Cover URL
                      <input
                        value={item.coverImagePath}
                        onChange={(e) =>
                          setPayload((current) => {
                            const next = structuredClone(current);
                            next.items[itemIndex].coverImagePath = e.target.value;
                            return next;
                          })
                        }
                      />
                    </label>
                    <label>
                      כתובת מקור
                      <input
                        value={item.sourceUrl ?? ""}
                        onChange={(e) =>
                          setPayload((current) => {
                            const next = structuredClone(current);
                            const normalized = e.target.value.trim();
                            next.items[itemIndex].sourceUrl = normalized ? normalized : null;
                            return next;
                          })
                        }
                        placeholder="https://mandarinaduck.com/products/..."
                      />
                    </label>
                    <label>
                      העלאת Cover
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onCoverUpload(itemIndex, file);
                        }}
                      />
                    </label>
                    <div className="admin-item-import">
                      <label>
                        הכנס מספר קטלוגי ליבוא למוצר זה
                        <input
                          value={itemCatalogInputs[item.id] || ""}
                          onChange={(e) =>
                            setItemCatalogInputs((current) => ({
                              ...current,
                              [item.id]: e.target.value,
                            }))
                          }
                          placeholder="מספר קטלוגי למוצר זה"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => onImportIntoExistingItem(itemIndex, item.id)}
                        disabled={Boolean(itemImportingMap[item.id] || isImporting || isSaving)}
                      >
                        {itemImportingMap[item.id] ? "מייבא..." : "ייבא למוצר זה"}
                      </button>
                    </div>
                  </div>

                  <p className="admin-import-note">
                    זוויות מוצר ({item.angles.length}) מתעדכנות אוטומטית בייבוא לפי מספר קטלוגי.
                  </p>
                </article>
              );
            })}
          </section>

          <section className="admin-save">
            <button onClick={onSave} disabled={isSaving}>
              {isSaving ? "שומר..." : "שמור הכל"}
            </button>
          </section>
        </>
      )}
    </main>
  );
}
