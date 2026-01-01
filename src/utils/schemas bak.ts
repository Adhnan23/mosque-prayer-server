import { z } from "zod";

export const timeDbSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);

export const timeFromDbSchema = timeDbSchema.transform((val) =>
  val.split(":").map(Number)
);

export const timeTo12hStringSchema = timeDbSchema.transform((val) => {
  const [h, m] = val.split(":").map(Number);

  const meridiem = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;

  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(
    2,
    "0"
  )} ${meridiem}`;
});

export const collectiveTime12hStringSchema = z
  .record(z.string(), timeDbSchema)
  .transform((times) =>
    Object.fromEntries(
      Object.entries(times).map(([key, value]) => [
        key,
        timeTo12hStringSchema.parse(value),
      ])
    )
  );

export const collectiveTimeFormatter = (format: "12h" | "24h" = "24h") =>
  z.record(z.string(), timeDbSchema).transform((times) => {
    if (format === "24h") return times;

    return Object.fromEntries(
      Object.entries(times).map(([key, value]) => [
        key,
        timeTo12hStringSchema.parse(value),
      ])
    );
  });

export const timeToDbSchema = z
  .tuple([z.number().int().min(0).max(23), z.number().int().min(0).max(59)])
  .transform(
    ([h, m]) => `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
  );

export const collectiveTimeSchema = z.record(z.string(), timeFromDbSchema);
export const collectiveTimeToDbSchema = z.record(z.string(), timeToDbSchema);

export const day = z.coerce.number().int().min(1).max(31);
export const month = z.coerce.number().int().min(1).max(12);
export const limit = z.coerce.number().int().positive().optional();
export const lang = z.string().min(2).max(4).default("en");
export const paramId = z.coerce.number().int().positive();
