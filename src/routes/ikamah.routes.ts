import { IkamahController } from "@controllers";
import { IkamahValidator } from "@validators";
import Elysia from "elysia";

const IkamahRoute = new Elysia({ prefix: "/ikamah" })
  .get("/", IkamahController.get, IkamahValidator.get)
  .get("/time", IkamahController.time, IkamahValidator.time)
  .put("/", IkamahController.update, IkamahValidator.update);

export default IkamahRoute;
