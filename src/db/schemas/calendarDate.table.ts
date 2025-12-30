import { sqliteTable, integer, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const calendarDateTable = sqliteTable(
  "calendar_date",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    month: integer("month").notNull(),
    day: integer("day").notNull(),
  },
  (table) => ({
    uniqueDate: uniqueIndex("calendar_date_unique").on(table.month, table.day),
  })
);

const CalendarDate = {
  table: calendarDateTable,
  schema: {
    select: createSelectSchema(calendarDateTable, {
      id: z.number().int().positive(),
    }).strict(),
  },
};

type TCalendarDate = z.infer<typeof CalendarDate.schema.select>;

export { CalendarDate, calendarDateTable, TCalendarDate };
