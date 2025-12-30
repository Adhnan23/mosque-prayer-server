import { Elysia } from "elysia";
import { LocalizationValidator } from "../middlewares/validator";
import { LocalizationController } from "../controllers";

const localizationRoute = new Elysia({ prefix: "/local" })
  .get("/languages", LocalizationController.getLanguages)
  .get(
    "/translations/:lang",
    LocalizationController.getTranslations,
    LocalizationValidator.getTranslations
  );

export default localizationRoute;
