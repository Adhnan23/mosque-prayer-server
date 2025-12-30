import { sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

const ikamahDelayTable = sqliteTable("ikamah_delay", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fajr: integer("fajr").notNull(),
  jummah: integer("jummah").notNull(),
  dhuhr: integer("dhuhr").notNull(),
  asr: integer("asr").notNull(),
  maghrib: integer("maghrib").notNull(),
  isha: integer("isha").notNull(),
});

const IkamahDelay = {
  table: ikamahDelayTable,
  schema: {
    select: createSelectSchema(ikamahDelayTable, {
      id: z.number().int().positive(),
      fajr: z.number().int().min(0).max(60),
      jummah: z.number().int().min(0).max(60),
      dhuhr: z.number().int().min(0).max(60),
      asr: z.number().int().min(0).max(60),
      maghrib: z.number().int().min(0).max(60),
      isha: z.number().int().min(0).max(60),
    })
      .omit({ id: true })
      .strict(),
    update: createUpdateSchema(ikamahDelayTable, {
      fajr: z.coerce.number().int().min(0).max(60),
      jummah: z.coerce.number().int().min(0).max(60),
      dhuhr: z.coerce.number().int().min(0).max(60),
      asr: z.coerce.number().int().min(0).max(60),
      maghrib: z.coerce.number().int().min(0).max(60),
      isha: z.coerce.number().int().min(0).max(60),
    })
      .partial()
      .strict(),
  },
};

type TIkamahDelay = z.infer<typeof IkamahDelay.schema.select>;
type TIkamahDelayUpdate = z.infer<typeof IkamahDelay.schema.update>;

export { IkamahDelay, ikamahDelayTable, TIkamahDelay, TIkamahDelayUpdate };
