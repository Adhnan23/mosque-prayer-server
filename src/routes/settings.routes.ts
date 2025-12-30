import { Elysia } from "elysia";
import { SettingsValidator } from "../middlewares/validator";
import { SettingsController } from "../controllers";

const settingsRoute = new Elysia({ prefix: "/settings" })
  .get("/", SettingsController.getAll, SettingsValidator.getAll)
  .get("/:name", SettingsController.get, SettingsValidator.get)
  .put("/", SettingsController.update, SettingsValidator.update);

export default settingsRoute;
