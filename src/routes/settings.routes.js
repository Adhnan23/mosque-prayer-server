import { Router } from "express";
import { SettingsController } from "../controllers/index.js";
import { SettingsValidator } from "../middlewares/validators/index.js";

const SettingsRouter = Router();
SettingsRouter.put("/", SettingsValidator.update, SettingsController.update);

export default SettingsRouter;
