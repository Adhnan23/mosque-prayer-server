import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { calendarDateTable } from "./calendarDate.table.js";
import { timeDbSchema } from "../../utils/schemas.js";

const prayerTimeTable = sqliteTable("prayer_time", {
  id: int("id").primaryKey({ autoIncrement: true }),
  dateId: int("date_id")
    .notNull()
    .references(() => calendarDateTable.id),
  fajir: text("fajir").notNull(),
  sunrise: text("sunrise").notNull(),
  dhuar: text("dhuar").notNull(),
  asar: text("asar").notNull(),
  magrib: text("magrib").notNull(),
  isha: text("isha").notNull(),
});

const PrayerTime = {
  table: prayerTimeTable,
  schema: {
    select: createSelectSchema(prayerTimeTable).strict(),
    insert: createInsertSchema(prayerTimeTable, {
      fajir: timeDbSchema,
      sunrise: timeDbSchema,
      dhuar: timeDbSchema,
      asar: timeDbSchema,
      magrib: timeDbSchema,
      isha: timeDbSchema,
    }).strict(),
    update: createUpdateSchema(prayerTimeTable).partial().strict(),
  },
};

export { PrayerTime, prayerTimeTable };
