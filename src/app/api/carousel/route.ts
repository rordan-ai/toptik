import { NextResponse } from "next/server";
import { getCarouselPayload } from "@/lib/carousel/repository";

export async function GET() {
  try {
    const payload = await getCarouselPayload();
    return NextResponse.json(payload);
  } catch (error) {
    console.error("GET /api/carousel failed", error);
    return NextResponse.json({ error: "Failed to load carousel" }, { status: 500 });
  }
}
