import { z } from "zod";

/* ──────────────────────────────────────────────
   Base time schemas
────────────────────────────────────────────── */

export const timeDbSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);

export const timeFromDbSchema = timeDbSchema.transform(
  (val) => val.split(":").map(Number) as [number, number]
);

/* ──────────────────────────────────────────────
   Pure formatters (NO parsing inside transforms)
────────────────────────────────────────────── */

const time24To12 = (val: string): string => {
  const [h, m] = val.split(":").map(Number);

  const meridiem = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;

  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(
    2,
    "0"
  )} ${meridiem}`;
};

/* ──────────────────────────────────────────────
   Single value schema (kept for compatibility)
────────────────────────────────────────────── */

export const timeTo12hStringSchema = timeDbSchema.transform(time24To12);

/* ──────────────────────────────────────────────
   Deep value-driven transformer
   (preserves arrays & object shapes)
────────────────────────────────────────────── */

const transformTimesDeep = (value: unknown, format: "12h" | "24h"): unknown => {
  if (Array.isArray(value)) {
    return value.map((v) => transformTimesDeep(v, format));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, transformTimesDeep(v, format)])
    );
  }

  if (typeof value === "string" && timeDbSchema.safeParse(value).success) {
    return format === "24h" ? value : time24To12(value);
  }

  return value;
};

type Translations = Record<string, string>;

export const transformTimesAndTranslate = (
  value: unknown,
  format: "12h" | "24h" = "24h",
  translations: Translations = {}
): unknown => {
  if (Array.isArray(value)) {
    return value.map((v) =>
      transformTimesAndTranslate(v, format, translations)
    );
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => {
        const newKey = translations[k] || k; // translate key if exists
        // Reuse transformTimesDeep for the value
        const newValue = transformTimesDeep(v, format);
        return [newKey, newValue];
      })
    );
  }

  // For primitive values that are not objects/arrays, just run transformTimesDeep
  return transformTimesDeep(value, format);
};

/* ──────────────────────────────────────────────
   Collective formatters (shape-agnostic)
────────────────────────────────────────────── */

export const collectiveTime12hStringSchema = z
  .any()
  .transform((data) => transformTimesDeep(data, "12h"));

export const collectiveTimeFormatter = (format: "12h" | "24h" = "24h") =>
  z.any().transform((data) => transformTimesDeep(data, format));

/* ──────────────────────────────────────────────
   DB write schemas (unchanged)
────────────────────────────────────────────── */

export const timeToDbSchema = z
  .tuple([z.number().int().min(0).max(23), z.number().int().min(0).max(59)])
  .transform(
    ([h, m]) => `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
  );

export const collectiveTimeSchema = z.record(z.string(), timeFromDbSchema);
export const collectiveTimeToDbSchema = z.record(z.string(), timeToDbSchema);

/* ──────────────────────────────────────────────
   Common params
────────────────────────────────────────────── */

export const day = z.coerce.number().int().min(1).max(31);
export const month = z.coerce.number().int().min(1).max(12);
export const limit = z.coerce.number().int().positive().optional();
export const format = z.enum(["12h", "24h"]).default("24h");
export const paramId = z.coerce.number().int().positive();
