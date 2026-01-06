import { Languages } from "@schemas";
import { languageCode } from "@utils";
import z from "zod";

const LanguagesValidator = {
  get: {},
  getByCode: {
    params: z.object({ code: languageCode }).strict(),
  },
  insert: {
    body: Languages.schema.insert.strict(),
  },
  delete: {
    params: z.object({ code: languageCode }).strict(),
  },
};

export default LanguagesValidator;
