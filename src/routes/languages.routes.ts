import { LanguagesController } from "@controllers";
import { LanguagesValidator } from "@validators";
import Elysia from "elysia";

const LanguagesRoute = new Elysia({ prefix: "/languages" })
  .get("/", LanguagesController.get, LanguagesValidator.get)
  .get("/:code", LanguagesController.getByCode, LanguagesValidator.getByCode)
  .post("/", LanguagesController.insert, LanguagesValidator.insert)
  .delete("/:code", LanguagesController.delete, LanguagesValidator.delete);

export default LanguagesRoute;
