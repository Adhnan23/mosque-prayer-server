import { sql } from "drizzle-orm";
import { sqliteTable, text, primaryKey, check } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";
import { languagesTable } from "@schemas";

export const translationsTable = sqliteTable(
    "translations",
    {
        language_code: text("language_code")
            .notNull()
            .references(() => languagesTable.code, { onDelete: "cascade" }),
        category: text("category").notNull(),
        key: text("key").notNull(),
        value: text("value").notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.language_code, table.category, table.key] }),
        check("category_not_empty", sql`length(${table.category}) > 0`),
        check("key_not_empty", sql`length(${table.key}) > 0`),
    ]
);

const Translations = {
    table: translationsTable,
    schema: {
        select: createSelectSchema(translationsTable).strict(),
        insert: createInsertSchema(translationsTable, {
            language_code: z.string().min(2).max(4),
            category: z.string().min(1).max(50),
            key: z.string().min(1).max(100),
            value: z.string().min(1),
        }).strict(),
        update: createUpdateSchema(translationsTable)
            .omit({ language_code: true, category: true, key: true })
            .strict(),
    }
};

export type TTranslation = z.infer<typeof Translations.schema.select>;
export type TTranslationInsert = z.infer<typeof Translations.schema.insert>;
export type TTranslationUpdate = z.infer<typeof Translations.schema.update>;

export { Translations };