import { sqliteTable, int } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

const calendarDateTable = sqliteTable("calendar_date", {
  id: int("id").primaryKey({ autoIncrement: true }),
  month: int("month").notNull(),
  day: int("day").notNull(),
});

const CalendarDate = {
  table: calendarDateTable,
  schema: {
    select: createSelectSchema(calendarDateTable).strict(),
    insert: createInsertSchema(calendarDateTable, {
      id: z.never(),
      day: z.int().positive().min(1).max(31),
      month: z.int().positive().min(1).max(12),
    }).strict(),
    update: createUpdateSchema(calendarDateTable, {
      day: z.int().positive().min(1).max(31).optional(),
      month: z.int().positive().min(1).max(12).optional(),
    })
      .partial()
      .strict(),
  },
};
export { CalendarDate, calendarDateTable };
