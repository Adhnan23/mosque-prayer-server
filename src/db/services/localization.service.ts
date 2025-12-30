import { eq, and } from "drizzle-orm";
import db from "..";
import { Translation, Language } from "../schemas";

const LocalizationServices = {
  getTranslations: async (langCode: string, category?: string) => {
    let query = db
      .select({
        category: Translation.table.category,
        key: Translation.table.key,
        value: Translation.table.value,
      })
      .from(Translation.table)
      .where(eq(Translation.table.langCode, langCode))
      .$dynamic();

    if (category) {
      query = query.where(
        and(
          eq(Translation.table.langCode, langCode),
          eq(Translation.table.category, category)
        )
      );
    }

    return await query;
  },

  getLanguages: async () => {
    return await db.select().from(Language.table).all();
  },
};

export default LocalizationServices;
