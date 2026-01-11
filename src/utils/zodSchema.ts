import { TSettingsUpdate } from "@schemas";
import z from "zod";

export const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
export const timeField = z
  .string()
  .regex(timeRegex, "Invalid time format (HH:mm)");
export const timeFormat = z
  .union([z.literal("24"), z.literal("12")], "format must be 12 or 24")
  .default("24");

export const delayValidation = z.number().int().min(0).max(90);

export const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const colorField = z
  .string()
  .regex(hexRegex, "Invalid Hex Color (e.g. #ffffff)");

export const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const dateField = z
  .string()
  .regex(dateRegex, "Format must be YYYY-MM-DD");

export const limit = z.union([z.coerce.number().min(1), z.undefined()]);
export type TLimit = z.infer<typeof limit>;

export const languageCode = z.string().min(2).max(4).toLowerCase();

export const settingsColumn = z.enum([
  "mosque_name",
  "language_code",
  "time_format",
  "is_ramadan",
  "hijri_offset",
  "primary_color",
  "secondary_color",
  "accent_color",
  "background_color",
  "foreground_color",
]);
export type SettingsColumn = z.infer<typeof settingsColumn>;

export const month = z.coerce.number().int().min(1).max(12);
export const day = z.coerce.number().int().min(1).max(31);
export const id = z.coerce.number().int().min(1);
