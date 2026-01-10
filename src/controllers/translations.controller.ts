import db from "@db";
import { TranslationsServices } from "@queries";
import { Translations, TTranslationInsert, TTranslationUpdate } from "@schemas";
import { respond } from "@utils";
import { and, eq } from "drizzle-orm";
import { InternalServerError, NotFoundError } from "elysia";

const TranslationsController = {
  get: async () => {
    const translations = await TranslationsServices.get();
    if (translations.length === 0)
      throw new NotFoundError("No translations found");
    return respond(true, "Translations fetched successfully", translations);
  },
  getByCode: async ({ params: { code } }: { params: { code: string } }) => {
    const translations = await TranslationsServices.getByCode(code);
    if (translations.length === 0)
      throw new NotFoundError("No translations found");
    return respond(true, "Translations fetched successfully", translations);
  },
  getByCategory: async ({
    params: { code, category },
  }: {
    params: { code: string; category: string };
  }) => {
    const translations = await TranslationsServices.getByCategory(
      code,
      category
    );
    if (translations.length === 0)
      throw new NotFoundError("No translations found");
    return respond(true, "Translations fetched successfully", translations);
  },
  getByKey: async ({
    params: { code, key },
  }: {
    params: { code: string; key: string };
  }) => {
    const value = await TranslationsServices.getByKey(code, key);
    if (value === undefined) throw new NotFoundError("No translation found");
    return respond(true, "Translation fetched successfully", value);
  },
  insert: async ({
    params: { code, category, key },
    body: { value },
  }: {
    params: { code: string; category: string; key: string };
    body: TTranslationInsert;
  }) => {
    const inserted = await TranslationsServices.insert({
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
    body: { value: TTranslationUpdate };
  }) => {
    const updated = await TranslationsServices.update(
      code,
      category,
      key,
      value
    );
    if (!updated) throw new NotFoundError("Translation not found");
    return respond(true, "Translation updated successfully", updated);
  },
  delete: async ({
    params: { code, category, key },
  }: {
    params: { code: string; category: string; key: string };
  }) => {
    const deleted = await TranslationsServices.delete(code, category, key);
    if (!deleted) throw new NotFoundError("Translation not found");
    return respond(true, "Translation deleted successfully", deleted);
  },
};

export default TranslationsController;
