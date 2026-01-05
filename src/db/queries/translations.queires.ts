import db from "@db";
import { Translations, TTranslationInsert, TTranslationUpdate } from "@schemas";
import { and, eq } from "drizzle-orm";

const TranslationsServices = {
  get: async (code?: string) => {
    const results =
      code === undefined
        ? await db.select().from(Translations.table)
        : await db
            .select()
            .from(Translations.table)
            .where(eq(Translations.table.language_code, code));
    return results;
  },
  getByCategory: async (code: string, category: string) => {
    const results = await db
      .select()
      .from(Translations.table)
      .where(
        and(
          eq(Translations.table.language_code, code),
          eq(Translations.table.category, category)
        )
      );
    return results;
  },
  getByKey: async (code: string, key: string) => {
    const [result] = await db
      .select()
      .from(Translations.table)
      .where(
        and(
          eq(Translations.table.language_code, code),
          eq(Translations.table.key, key)
        )
      )
      .limit(1);
    return result?.value;
  },
  insert: async (data: TTranslationInsert) => {
    await db.insert(Translations.table).values(data);
    return data;
  },
  update: async (
    code: string,
    category: string,
    key: string,
    data: TTranslationUpdate
  ) => {
    const result = await db
      .update(Translations.table)
      .set(data)
      .where(
        and(
          eq(Translations.table.language_code, code),
          eq(Translations.table.category, category),
          eq(Translations.table.key, key)
        )
      );

    return result;
  },
  delete: async (code: string, category: string, key: string) => {
    const result = await db
      .delete(Translations.table)
      .where(
        and(
          eq(Translations.table.language_code, code),
          eq(Translations.table.category, category),
          eq(Translations.table.key, key)
        )
      );

    return result;
  },
};

export default TranslationsServices;
