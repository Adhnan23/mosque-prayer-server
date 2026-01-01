import { NotFoundError } from "elysia";
import { LocalizationServices } from "../db/services";
import respond from "../utils/respond";

const LocalizationController = {
  getLanguages: async () => {
    const data = await LocalizationServices.getLanguages();
    return respond(true, "Languages retrieved successfully", data);
  },

  getTranslations: async ({
    params: { lang },
    query: { category },
  }: {
    params: { lang: string };
    query: { category?: string };
  }) => {
    const rawData = await LocalizationServices.getTranslations(lang, category);

    if (!rawData || rawData.length === 0) {
      throw new NotFoundError(`Translations not found`);
    }

    if (category) {
      const flat = rawData.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {} as Record<string, string>);

      return respond(true, `Translations for ${category} retrieved`, flat);
    }

    const grouped = rawData.reduce((acc, curr) => {
      if (!acc[curr.category]) acc[curr.category] = {};
      acc[curr.category][curr.key] = curr.value;
      return acc;
    }, {} as Record<string, Record<string, string>>);

    return respond(true, "All translations retrieved", grouped);
  },
};

export default LocalizationController;
