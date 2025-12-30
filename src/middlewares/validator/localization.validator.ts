import z from "zod";

const LocalizationValidator = {
  getTranslations: {
    params: z.object({
      lang: z.string().min(2).max(5),
    }),
    query: z.object({
      category: z.string().optional(),
    }),
  },
};

export default LocalizationValidator;
