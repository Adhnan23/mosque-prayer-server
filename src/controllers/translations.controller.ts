import db from "@db";
import { Translations, TTranslationInsert, TTranslationUpdate } from "@schemas";
import { respond } from "@utils";
import { and, eq } from "drizzle-orm";
import { InternalServerError, NotFoundError } from "elysia";

const TranslationsController = {
  get: async () => {
    const translations = await db.select().from(Translations.table);
    if (!translations) throw new NotFoundError("No translations found");
    return respond(true, "Translations fetched successfully", translations);
  },
  getByCode: async ({ params: { code } }: { params: { code: string } }) => {
    const translations = await db
      .select()
      .from(Translations.table)
      .where(eq(Translations.table.language_code, code));
    if (!translations || translations.length === 0)
      throw new NotFoundError("No translations found");
    return respond(true, "Translations fetched successfully", translations);
  },
  getByCategory: async ({
    params: { code, category },
  }: {
    params: { code: string; category: string };
  }) => {
    const translations = await db
      .select()
      .from(Translations.table)
      .where(
        and(
          eq(Translations.table.language_code, code),
          eq(Translations.table.category, category)
        )
      );
    if (!translations || translations.length === 0)
      throw new NotFoundError("No translation found");
    return respond(true, "Translations fetched successfully", translations);
  },
  getByKey: async ({
    params: { code, key },
  }: {
    params: { code: string; key: string };
  }) => {
    const [row] = await db
      .select()
      .from(Translations.table)
      .where(
        and(
          eq(Translations.table.language_code, code),
          eq(Translations.table.key, key)
        )
      );
    if (!row || !row.value) throw new NotFoundError("No translation found");
    return respond(true, "Translation fetched successfully", row.value);
  },
  insert: async ({
    params: { code, category, key },
    body: { value },
  }: {
    params: { code: string; category: string; key: string };
    body: TTranslationInsert;
  }) => {
    const inserted = await db.insert(Translations.table).values({
      language_code: code,
      category,
      key,
      value,
    });
    if (!inserted)
      throw new InternalServerError("Failed to insert translation");
    return respond(true, "Translation inserted successfully", inserted);
  },
  update: async ({
    params: { code, category, key },
    body: { value },
  }: {
    params: { code: string; category: string; key: string };
    body: TTranslationUpdate;
  }) => {
    const updated = await db
      .update(Translations.table)
      .set({ value })
      .where(
        and(
          eq(Translations.table.language_code, code),
          eq(Translations.table.category, category),
          eq(Translations.table.key, key)
        )
      );
    if (!updated) throw new InternalServerError("Failed to update translation");
    return respond(true, "Translation updated successfully", updated);
  },
  delete: async ({
    params: { code, category, key },
  }: {
    params: { code: string; category: string; key: string };
  }) => {
    const deleted = await db
      .delete(Translations.table)
      .where(
        and(
          eq(Translations.table.language_code, code),
          eq(Translations.table.category, category),
          eq(Translations.table.key, key)
        )
      );
    if (!deleted) throw new InternalServerError("Failed to delete translation");
    return respond(true, "Translation deleted successfully", deleted);
  },
};

export default TranslationsController;
