"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CarouselPayload } from "@/lib/carousel/types";
import { fallbackCarouselPayload } from "@/lib/carousel/fallback-data";

const STORAGE_KEY = "toptik_admin_token";

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const [payload, setPayload] = useState<CarouselPayload>(fallbackCarouselPayload);
  const [status, setStatus] = useState<string>("טוען...");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedToken = window.localStorage.getItem(STORAGE_KEY) || "";
    setToken(savedToken);
    setAuthReady(Boolean(savedToken));
    if (!savedToken) {
      setStatus("הזן טוקן אדמין כדי להתחבר");
      return;
    }
    loadData(savedToken);
  }, []);

  async function loadData(activeToken: string) {
    try {
      setStatus("טוען נתוני אדמין...");
      const res = await fetch("/api/admin/carousel", {
        headers: { "x-admin-token": activeToken },
      });
      if (!res.ok) throw new Error("Unauthorized or load failed");
      const data = await res.json();
      setPayload(data);
      setStatus("מחובר");
      setAuthReady(true);
    } catch {
      setStatus("טוקן לא תקין או חוסר הרשאות");
      setAuthReady(false);
    }
  }

  function updateItemField(index: number, field: "title" | "description" | "displayOrder" | "isActive", value: string | number | boolean) {
    setPayload((current) => {
      const next = structuredClone(current);
      const item = next.items[index];
      if (field === "displayOrder") item.displayOrder = Number(value);
      else if (field === "isActive") item.isActive = Boolean(value);
      else if (field === "description") item.description = String(value);
      else item.title = String(value);
      return next;
    });
  }

  function updateAngleField(itemIndex: number, angleIndex: number, field: "angleKey" | "angleOrder" | "imagePath", value: string | number) {
    setPayload((current) => {
      const next = structuredClone(current);
      const angle = next.items[itemIndex].angles[angleIndex];
      if (field === "angleOrder") angle.angleOrder = Number(value);
      else angle[field] = String(value);
      return next;
    });
  }

  function addItem() {
    setPayload((current) => {
      const next = structuredClone(current);
      next.items.push({
        id: crypto.randomUUID(),
        title: "מוצר חדש",
        description: "",
        coverImagePath: "/hero-web-airport.png",
        displayOrder: next.items.length + 1,
        isActive: true,
        angles: [
          {
            id: crypto.randomUUID(),
            itemId: "",
            angleKey: "front",
            imagePath: "/hero-web-airport.png",
            angleOrder: 1,
          },
        ],
      });
      return next;
    });
  }

  function addAngle(itemIndex: number) {
    setPayload((current) => {
      const next = structuredClone(current);
      const target = next.items[itemIndex];
      target.angles.push({
        id: crypto.randomUUID(),
        itemId: target.id,
        angleKey: `angle-${target.angles.length + 1}`,
        imagePath: target.coverImagePath,
        angleOrder: target.angles.length + 1,
      });
      return next;
    });
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
    if (!res.ok) throw new Error("Upload failed");
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
    } catch {
      setStatus("שגיאת העלאה");
    }
  }

  async function onAngleUpload(itemIndex: number, angleIndex: number, file: File) {
    try {
      setStatus("מעלה זווית...");
      const item = payload.items[itemIndex];
      const angle = item.angles[angleIndex];
      const url = await uploadFile(file, `items/${item.id}/angles/${angle.angleKey}`);
      setPayload((current) => {
        const next = structuredClone(current);
        next.items[itemIndex].angles[angleIndex].imagePath = url;
        return next;
      });
      setStatus("זווית הועלתה");
    } catch {
      setStatus("שגיאת העלאה");
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
      if (!res.ok) throw new Error("Save failed");
      setStatus("נשמר בהצלחה");
    } catch {
      setStatus("שגיאת שמירה");
    } finally {
      setIsSaving(false);
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
                  </div>

                  <div className="admin-angles">
                    <div className="admin-angles-head">
                      <h3>זוויות מוצר ({item.angles.length})</h3>
                      <button onClick={() => addAngle(itemIndex)}>הוסף זווית</button>
                    </div>
                    {item.angles.map((angle, angleIndex) => (
                      <div key={angle.id} className="admin-angle-row">
                        <input
                          value={angle.angleKey}
                          onChange={(e) => updateAngleField(itemIndex, angleIndex, "angleKey", e.target.value)}
                          placeholder="angle key"
                        />
                        <input
                          type="number"
                          value={angle.angleOrder}
                          onChange={(e) => updateAngleField(itemIndex, angleIndex, "angleOrder", Number(e.target.value))}
                        />
                        <input
                          value={angle.imagePath}
                          onChange={(e) => updateAngleField(itemIndex, angleIndex, "imagePath", e.target.value)}
                          placeholder="image url"
                        />
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) onAngleUpload(itemIndex, angleIndex, file);
                          }}
                        />
                      </div>
                    ))}
                  </div>
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
