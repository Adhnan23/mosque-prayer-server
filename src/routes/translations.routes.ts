import { TranslationsController } from "@controllers";
import { TranslationsValidator } from "@validators";
import Elysia from "elysia";

const TranslationsRoute = new Elysia({ prefix: "/translations" })
  .get("/", TranslationsController.get, TranslationsValidator.get)
  .get(
    "/:code",
    TranslationsController.getByCode,
    TranslationsValidator.getByCode
  )
  .get(
    "/:code/:category",
    TranslationsController.getByCategory,
    TranslationsValidator.getByCategory
  )
  .get(
    "/value/:code/:key",
    TranslationsController.getByKey,
    TranslationsValidator.getByKey
  )
  .post(
    "/:code/:category/:key",
    TranslationsController.insert,
    TranslationsValidator.insert
  )
  .put(
    "/:code/:category/:key",
    TranslationsController.update,
    TranslationsValidator.update
  )
  .delete(
    "/:code/:category/:key",
    TranslationsController.delete,
    TranslationsValidator.delete
  );

export default TranslationsRoute;
