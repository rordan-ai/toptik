import { z } from "zod";

export const carouselSettingsSchema = z.object({
  autoplayMs: z.number().int().min(1500).max(12000),
  transitionMode: z.enum(["shatter-particle", "curtain-fade"]),
});

export const carouselAngleInputSchema = z.object({
  id: z.string().uuid().optional(),
  angleKey: z.string().min(1).max(32),
  angleOrder: z.number().int().min(1).max(12),
  imagePath: z.string().min(1),
});

export const carouselItemInputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(120),
  description: z.string().max(2000).nullable().optional(),
  displayOrder: z.number().int().min(1).max(9999),
  isActive: z.boolean(),
  coverImagePath: z.string().min(1),
  angles: z.array(carouselAngleInputSchema).min(1).max(8),
});

export const adminCarouselPayloadSchema = z.object({
  settings: carouselSettingsSchema,
  items: z.array(carouselItemInputSchema).min(1).max(80),
});
