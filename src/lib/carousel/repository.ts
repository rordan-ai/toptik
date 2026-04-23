import { fallbackCarouselPayload } from "@/lib/carousel/fallback-data";
import { CarouselPayload } from "@/lib/carousel/types";
import { createSupabaseServerClient, createSupabaseServiceRoleClient } from "@/lib/supabase/server";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";
import { adminCarouselPayloadSchema } from "@/lib/validation/carousel";

type SettingsRow = {
  id: number;
  autoplay_ms: number;
  transition_mode: "shatter-particle" | "curtain-fade";
};

type ItemRow = {
  id: string;
  title: string;
  description: string | null;
  cover_image_path: string;
  display_order: number;
  is_active: boolean;
};

type AngleRow = {
  id: string;
  item_id: string;
  angle_key: string;
  image_path: string;
  angle_order: number;
};

export async function getCarouselPayload(): Promise<CarouselPayload> {
  if (!hasSupabasePublicEnv()) {
    return fallbackCarouselPayload;
  }

  const supabase = createSupabaseServerClient();

  const [{ data: settingsRow }, { data: itemRows, error: itemsError }] = await Promise.all([
    supabase.from("carousel_settings").select("*").eq("id", 1).maybeSingle<SettingsRow>(),
    supabase.from("carousel_items").select("*").eq("is_active", true).order("display_order", { ascending: true }),
  ]);

  if (itemsError || !itemRows) {
    return fallbackCarouselPayload;
  }

  const itemIds = itemRows.map((row: ItemRow) => row.id);
  const { data: angleRows } = await supabase
    .from("carousel_item_angles")
    .select("*")
    .in("item_id", itemIds.length ? itemIds : [""])
    .order("angle_order", { ascending: true });

  const anglesByItem = new Map<string, AngleRow[]>();
  for (const angle of (angleRows ?? []) as AngleRow[]) {
    const existing = anglesByItem.get(angle.item_id) ?? [];
    existing.push(angle);
    anglesByItem.set(angle.item_id, existing);
  }

  return {
    items: (itemRows as ItemRow[]).map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      coverImagePath: item.cover_image_path,
      displayOrder: item.display_order,
      isActive: item.is_active,
      angles: (anglesByItem.get(item.id) ?? []).map((angle) => ({
        id: angle.id,
        itemId: angle.item_id,
        angleKey: angle.angle_key,
        imagePath: angle.image_path,
        angleOrder: angle.angle_order,
      })),
    })),
    settings: {
      autoplayMs: settingsRow?.autoplay_ms ?? fallbackCarouselPayload.settings.autoplayMs,
      transitionMode: settingsRow?.transition_mode ?? fallbackCarouselPayload.settings.transitionMode,
    },
  };
}

export async function saveCarouselPayload(input: unknown) {
  const parsed = adminCarouselPayloadSchema.parse(input);
  const supabase = createSupabaseServiceRoleClient();

  const normalizedItems = parsed.items.map((item) => ({
    ...item,
    id: item.id ?? crypto.randomUUID(),
    angles: item.angles.map((angle) => ({
      ...angle,
      id: angle.id ?? crypto.randomUUID(),
    })),
  }));

  const { error: settingsError } = await supabase.from("carousel_settings").upsert(
    {
      id: 1,
      autoplay_ms: parsed.settings.autoplayMs,
      transition_mode: parsed.settings.transitionMode,
    },
    { onConflict: "id" },
  );
  if (settingsError) throw settingsError;

  const itemRows = normalizedItems.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description ?? null,
    cover_image_path: item.coverImagePath,
    display_order: item.displayOrder,
    is_active: item.isActive,
  }));

  const { error: itemsError, data: upsertedItems } = await supabase
    .from("carousel_items")
    .upsert(itemRows, { onConflict: "id" })
    .select("id");
  if (itemsError) throw itemsError;

  const validItemIds = new Set((upsertedItems ?? []).map((row: { id: string }) => row.id));

  const angleRows = normalizedItems.flatMap((item) =>
    item.angles.map((angle) => ({
      id: angle.id,
      item_id: item.id,
      angle_key: angle.angleKey,
      image_path: angle.imagePath,
      angle_order: angle.angleOrder,
    })),
  );

  if (angleRows.length > 0) {
    const { error: anglesError } = await supabase
      .from("carousel_item_angles")
      .upsert(angleRows, { onConflict: "id" });
    if (anglesError) throw anglesError;
  }

  if (validItemIds.size > 0) {
    const { data: existingAngles } = await supabase.from("carousel_item_angles").select("id,item_id");
    const incomingAngleIds = new Set(normalizedItems.flatMap((item) => item.angles.map((angle) => angle.id)));
    const angleIdsToDelete = (existingAngles ?? [])
      .filter((row: { id: string; item_id: string }) => validItemIds.has(row.item_id) && !incomingAngleIds.has(row.id))
      .map((row: { id: string }) => row.id);

    if (angleIdsToDelete.length > 0) {
      await supabase.from("carousel_item_angles").delete().in("id", angleIdsToDelete);
    }
  }

  return { ok: true };
}
