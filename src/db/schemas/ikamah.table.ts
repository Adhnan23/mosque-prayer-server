import { sql } from "drizzle-orm";
import { sqliteTable, integer, check } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";
import { delayValidation } from "@utils";

export const ikamahTable = sqliteTable(
  "ikamah",
  {
    id: integer("id").primaryKey().default(1),
    fajr: integer("fajr").notNull().default(15),
    dhuhr: integer("dhuhr").notNull().default(15),
    asr: integer("asr").notNull().default(15),
    maghrib: integer("maghrib").notNull().default(5),
    isha: integer("isha").notNull().default(15),
    jummah: integer("jummah").notNull().default(0),
  },
  (table) => [
    check("single_row_check", sql`${table.id} = 1`),
    check("fajr_range", sql`${table.fajr} BETWEEN 0 AND 90`),
    check("dhuhr_range", sql`${table.dhuhr} BETWEEN 0 AND 90`),
    check("asr_range", sql`${table.asr} BETWEEN 0 AND 90`),
    check("maghrib_range", sql`${table.maghrib} BETWEEN 0 AND 90`),
    check("isha_range", sql`${table.isha} BETWEEN 0 AND 90`),
    check("jummah_range", sql`${table.jummah} BETWEEN 0 AND 90`),
  ]
);

const Ikamah = {
  table: ikamahTable,
  schema: {
    select: createSelectSchema(ikamahTable).strict(),
    update: createUpdateSchema(ikamahTable, {
      fajr: delayValidation,
      dhuhr: delayValidation,
      asr: delayValidation,
      maghrib: delayValidation,
      isha: delayValidation,
      jummah: delayValidation,
    })
      .omit({ id: true })
      .partial()
      .strict(),
  },
};

export type TIkamah = z.infer<typeof Ikamah.schema.select>;
export type TIkamahUpdate = z.infer<typeof Ikamah.schema.update>;

export { Ikamah };
