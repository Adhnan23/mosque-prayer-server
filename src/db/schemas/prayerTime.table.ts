import { sql } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  primaryKey,
  check,
} from "drizzle-orm/sqlite-core";
import { createSelectSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";
import { timeField } from "@utils";

export const prayerTimeTable = sqliteTable(
  "prayer_times",
  {
    month: integer("month").notNull(),
    day: integer("day").notNull(),
    fajr: text("fajr").notNull(),
    sunrise: text("sunrise").notNull(),
    dhuhr: text("dhuhr").notNull(),
    asr: text("asr").notNull(),
    maghrib: text("maghrib").notNull(),
    isha: text("isha").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.month, table.day] }),
    check("fajr_format", sql`${table.fajr} LIKE '__:__'`),
    check("sunrise_format", sql`${table.sunrise} LIKE '__:__'`),
    check("dhuhr_format", sql`${table.dhuhr} LIKE '__:__'`),
    check("asr_format", sql`${table.asr} LIKE '__:__'`),
    check("maghrib_format", sql`${table.maghrib} LIKE '__:__'`),
    check("isha_format", sql`${table.isha} LIKE '__:__'`),
  ]
);

const timeValidation = {
  fajr: timeField,
  sunrise: timeField,
  dhuhr: timeField,
  asr: timeField,
  maghrib: timeField,
  isha: timeField,
};
const PrayerTime = {
  table: prayerTimeTable,
  schema: {
    select: createSelectSchema(prayerTimeTable, timeValidation).strict(),
    update: createUpdateSchema(prayerTimeTable, timeValidation)
      .omit({ month: true, day: true })
      .partial()
      .strict(),
  },
};

export type TPrayerTime = z.infer<typeof PrayerTime.schema.select>;
export type TPrayerTimeUpdate = z.infer<typeof PrayerTime.schema.update>;

export { PrayerTime };
