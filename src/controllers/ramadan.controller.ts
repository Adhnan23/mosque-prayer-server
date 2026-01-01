import { NotFoundError } from "elysia";
import { LocalizationServices, RamadanServices } from "../db/services";
import respond from "../utils/respond";
import { TRamadanUpdate } from "../db/schemas";
import { transformTimesAndTranslate } from "../utils/schemas";

const RamadanController = {
  get: async ({
    query: { format, lang },
  }: {
    query: { format?: "12h" | "24h"; lang: string };
  }) => {
    const data = await RamadanServices.get();
    const translation = await LocalizationServices.getTranslations(
      lang,
      "time_name"
    );
    if (!translation || translation.length === 0)
      return respond(false, "Invalid Language Code");

    const translationMap = Object.fromEntries(
      translation.map((t) => [t.key, t.value])
    );

    if (!data) throw new NotFoundError("Ramadan data not found");
    return respond(
      true,
      "Ramadan data retrieved successfully",
      transformTimesAndTranslate(data, format, translationMap)
    );
  },
  update: async ({ body }: { body: TRamadanUpdate }) => {
    const data = await RamadanServices.update(body);
    if (!data) throw new NotFoundError("Ramadan data not found");
    return respond(true, "Ramadan data updated successfully", data);
  },
};

export default RamadanController;
