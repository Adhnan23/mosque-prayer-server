import { Notice } from "@schemas";
import { id, languageCode } from "@utils";
import z from "zod";

const NoticeValidator = {
  get: {
    query: z
      .object({
        isActive: z
          .union([
            z.literal("true").transform(() => true),
            z.literal("false").transform(() => false),
          ])
          .optional(),
      })
      .strict(),
  },
  getById: {
    params: z.object({ id: id }).strict(),
  },
  getByCode: {
    params: z.object({ code: languageCode }).strict(),
  },
  insert: {
    body: Notice.schema.insert,
  },
  update: {
    params: z.object({ id: id }).strict(),
    body: Notice.schema.update,
  },
  delete: {
    params: z.object({ id: id }).strict(),
  },
};

export default NoticeValidator;
