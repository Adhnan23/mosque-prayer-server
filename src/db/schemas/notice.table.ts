import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

const noticeTable = sqliteTable("notice", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  noticeContent: text("noticeContent").notNull(),
  startDate: text("startDate").notNull(), // ISO date string
  endDate: text("endDate").notNull(),
  isActive: integer("isActive", { mode: "boolean" }).default(false).notNull(),
});

const Notice = {
  table: noticeTable,
  schema: {
    select: createSelectSchema(noticeTable, {
      id: z.number().int().positive(),
    }).strict(),
    insert: createInsertSchema(noticeTable, {
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    }).strict(),
    update: createUpdateSchema(noticeTable, {
      startDate: z.iso.date().optional(),
      endDate: z.iso.date().optional(),
    })
      .omit({ id: true })
      .partial()
      .strict(),
  },
};

type TNotice = ReturnType<typeof Notice.schema.select.parse>;
type TNoticeInsert = ReturnType<typeof Notice.schema.insert.parse>;
type TNoticeUpdate = ReturnType<typeof Notice.schema.update.parse>;

export { Notice, noticeTable, TNotice, TNoticeInsert, TNoticeUpdate };
