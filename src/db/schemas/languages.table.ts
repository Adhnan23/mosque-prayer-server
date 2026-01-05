import { sql } from "drizzle-orm";
import { sqliteTable, text, check } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import z from "zod";

export const languagesTable = sqliteTable(
    "languages",
    {
        code: text("code").primaryKey(),
        name: text("name").notNull(),
    },
    (table) => [
        check(
            "code_length_check",
            sql`length(${table.code}) >= 2 AND length(${table.code}) <= 4`
        ),
        check("name_not_empty", sql`length(${table.name}) > 0`),
    ]
);

const Languages = {
    table: languagesTable,
    schema: {
        select: createSelectSchema(languagesTable).strict(),
        insert: createInsertSchema(languagesTable, {
            code: z.string().min(2).max(4).toLowerCase(),
            name: z.string().min(1, "Language name is required").max(50),
        }).strict(),
    }
};

export type TLanguage = z.infer<typeof Languages.schema.select>;
export type TLanguageInsert = z.infer<typeof Languages.schema.insert>;

export { Languages };