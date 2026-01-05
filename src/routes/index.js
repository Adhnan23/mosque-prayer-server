import { Router } from "express";
import IkamahDelayRouter from "./ikamahDelay.routes.js";
import SettingsRouter from "./settings.routes.js";

const ApiRouter = Router();
ApiRouter.use("/ikamah", IkamahDelayRouter);
ApiRouter.use("/settings", SettingsRouter);

export default ApiRouter;
