import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, check } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";
import { languagesTable } from "@schemas";
import { dateField } from "@utils";


export const noticesTable = sqliteTable(
    "notices",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        language_code: text("language_code")
            .notNull()
            .references(() => languagesTable.code),

        content: text("content").notNull(),
        start_date: text("start_date").notNull(),
        end_date: text("end_date").notNull(),
        is_active: integer("is_active", { mode: "boolean" }).notNull().default(true),
    },
    (table) => [
        check("date_logic", sql`${table.start_date} <= ${table.end_date}`),
        check("content_not_empty", sql`length(${table.content}) > 0`),
    ]
);

const Notice = {
    table: noticesTable,
    schema: {
        select: createSelectSchema(noticesTable).strict(),
        insert: createInsertSchema(noticesTable, {
            start_date: dateField,
            end_date: dateField,
            is_active: z.boolean().default(false),
        }).omit({ id: true }).strict(),
        update: createUpdateSchema(noticesTable, {
            start_date: dateField.optional(),
            end_date: dateField.optional(),
        })
            .omit({ id: true })
            .partial()
            .strict(),
        delete: z.object({
            id: z.number().int().positive()
        })
    }
};

export type TNotice = z.infer<typeof Notice.schema.select>;
export type TNoticeInsert = z.infer<typeof Notice.schema.insert>;
export type TNoticeUpdate = z.infer<typeof Notice.schema.update>;

export { Notice };