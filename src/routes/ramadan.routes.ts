import { RamadanController } from "@controllers";
import { RamadanValidator } from "@validators";
import Elysia from "elysia";

const RamadanRoute = new Elysia({ prefix: "/ramadan" })
  .get("/", RamadanController.get, RamadanValidator.get)
  .put("/", RamadanController.update, RamadanValidator.update);

export default RamadanRoute;
