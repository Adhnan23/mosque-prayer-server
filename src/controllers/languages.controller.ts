import { LanguagesServices } from "@queries";
import { respond } from "@utils";
import { NotFoundError, status } from "elysia";

const LanguagesController = {
  get: async () => {
    const languages = await LanguagesServices.get();
    if (languages.length === 0) throw new NotFoundError("Languages not found");
    return respond(true, "Languages fetched successfully", languages);
  },
  getByCode: async ({ params: { code } }: { params: { code: string } }) => {
    const language = await LanguagesServices.getByCode(code);
    if (!language) throw new NotFoundError("Language not found");
    return respond(true, "Language fetched successfully", language);
  },
  insert: async ({ body }: { body: { code: string; name: string } }) => {
    const language = await LanguagesServices.insert(body);
    if (!language)
      return status(400, respond(false, "Language already exists"));
    return status(
      "Created",
      respond(true, "Language inserted successfully", language)
    );
  },
  delete: async ({ params: { code } }: { params: { code: string } }) => {
    const result = await LanguagesServices.delete(code);
    if (!result) throw new NotFoundError("Language not deleted");
    return respond(true, "Language deleted successfully", result);
  },
};

export default LanguagesController;
