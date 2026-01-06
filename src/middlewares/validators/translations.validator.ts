import { Translations } from "@schemas";
import { languageCode } from "@utils";
import z from "zod";

const TranslationsValidator = {
  get: {},
  getByCode: {
    params: z.object({ code: languageCode }).strict(),
  },
  getByCategory: {
    params: z.object({ code: languageCode, category: z.string() }).strict(),
  },
  getByKey: {
    params: z.object({ code: languageCode, key: z.string() }).strict(),
  },
  insert: {
    params: z
      .object({
        code: languageCode,
        category: z.string(),
        key: z.string(),
      })
      .strict(),
    body: Translations.schema.insert,
  },
  update: {
    params: z
      .object({
        code: languageCode,
        category: z.string(),
        key: z.string(),
      })
      .strict(),
    body: Translations.schema.update,
  },
  delete: {
    params: z
      .object({
        code: languageCode,
        category: z.string(),
        key: z.string(),
      })
      .strict(),
  },
};

export default TranslationsValidator;
