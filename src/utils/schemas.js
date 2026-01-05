import { z } from "zod";

export const timeDbSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);

export const timeFromDbSchema = timeDbSchema.transform((val) =>
  val.split(":").map(Number)
);

export const timeToDbSchema = z
  .tuple([z.number().int().min(0).max(23), z.number().int().min(0).max(59)])
  .transform(
    ([h, m]) => `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
  );

export const collectiveTimeSchema = z.record(z.string(), timeFromDbSchema);
export const collectiveTimeToDbSchema = z.record(z.string(), timeToDbSchema);
