import { Elysia } from "elysia";
import { IkamahDelayValidator } from "../middlewares/validator";
import { IkamahDelayController } from "../controllers";

const ikamahRoute = new Elysia({ prefix: "/ikamah" })
  .get("/", IkamahDelayController.get, IkamahDelayValidator.get)
  .get("/time", IkamahDelayController.getTime, IkamahDelayValidator.getTime)
  .put("/", IkamahDelayController.update, IkamahDelayValidator.update);

export default ikamahRoute;
