import {
  sqliteTable,
  integer,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";

const languageTable = sqliteTable("language", {
  code: text("code").primaryKey(),
  name: text("name").notNull(),
});

const translationTable = sqliteTable(
  "translation",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    langCode: text("lang_code")
      .notNull()
      .references(() => languageTable.code),
    category: text("category").notNull(),
    key: text("key").notNull(),
    value: text("value").notNull(),
  },
  (table) => ({
    uniqueTrans: uniqueIndex("translation_unique").on(
      table.langCode,
      table.category,
      table.key
    ),
  })
);

const Language = {
  table: languageTable,
  schema: {
    select: createSelectSchema(languageTable).strict(),
  },
};

const Translation = {
  table: translationTable,
  schema: {
    select: createSelectSchema(translationTable).strict(),
  },
};

export { Language, Translation, languageTable, translationTable };
