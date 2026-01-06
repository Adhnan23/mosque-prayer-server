import { SettingsController } from "@controllers";
import { SettingsValidator } from "@validators";
import Elysia from "elysia";

const SettingsRoute = new Elysia({ prefix: "/settings" })
  .get("/", SettingsController.get, SettingsValidator.get)
  .get(
    "/:column",
    SettingsController.getByColumn,
    SettingsValidator.getByColumn
  )
  .put("/", SettingsController.update, SettingsValidator.update);

export default SettingsRoute;
