import { Elysia } from "elysia";
import { RamadanValidator } from "../middlewares/validator";
import { RamadanController } from "../controllers";

const ramadanRoute = new Elysia({ prefix: "/ramadan" })
  .get("/", RamadanController.get, RamadanValidator.get)
  .put("/", RamadanController.update, RamadanValidator.update);

export default ramadanRoute;
