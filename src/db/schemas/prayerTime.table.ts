import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { calendarDateTable } from "./calendarDate.table";
import { z } from "zod";
import { timeDbSchema } from "../../utils/schemas";

const prayerTimeTable = sqliteTable("prayer_time", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  dateId: integer("date_id")
    .notNull()
    .references(() => calendarDateTable.id),
  fajr: text("fajr").notNull(),
  sunrise: text("sunrise").notNull(),
  dhuhr: text("dhuhr").notNull(),
  asr: text("asr").notNull(),
  maghrib: text("maghrib").notNull(),
  isha: text("isha").notNull(),
});

const PrayerTime = {
  table: prayerTimeTable,
  schema: {
    select: createSelectSchema(prayerTimeTable, {
      id: z.number().int().positive(),
      dateId: z.number().int().positive(),
    }).strict(),
    update: createUpdateSchema(prayerTimeTable, {
      fajr: timeDbSchema.optional(),
      sunrise: timeDbSchema.optional(),
      dhuhr: timeDbSchema.optional(),
      asr: timeDbSchema.optional(),
      maghrib: timeDbSchema.optional(),
      isha: timeDbSchema.optional(),
    })
      .omit({ id: true, dateId: true })
      .partial()
      .strict(),
  },
};

type TPrayerTime = z.infer<typeof PrayerTime.schema.select>;
type TPrayerTimeUpdate = z.infer<typeof PrayerTime.schema.update>;

export { PrayerTime, prayerTimeTable, TPrayerTime, TPrayerTimeUpdate };
