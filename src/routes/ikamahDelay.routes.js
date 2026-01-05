import { Router } from "express";
import { IkamahDelayController } from "../controllers/index.js";
import { ikamahDelayValidator } from "../middlewares/validators/index.js";

const IkamahDelayRouter = Router();
IkamahDelayRouter.put(
  "/",
  ikamahDelayValidator.update,
  IkamahDelayController.update
);

export default IkamahDelayRouter;
