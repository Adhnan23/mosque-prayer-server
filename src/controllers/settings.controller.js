import createHttpError from "http-errors";
import { SettingsService } from "../db/services/index.js";
import { respondSender } from "../utils/respond.js";

const SettingsController = {
  get: async (req, res, next) => {
    const { name } = req.params;
    const data = await SettingsService.get(name);
    if (!data) return next(createHttpError(404, "Settings Not Found"));
    respondSender(res, true, 200, "Settings Fetched", data);
  },

  getAll: async (req, res, next) => {
    const data = await SettingsService.getAll();
    respondSender(res, true, 200, "Settings Fetched", data);
  },
  update: async (req, res, next) => {
    const { name, value } = req.body;
    const data = await SettingsService.update(name, value);
    if (!data)
      createHttpError(500, "Unable to Update Settings Try Again Later");
    respondSender(res, true, 200, "Settings Updated", data);
  },
};

export default SettingsController;
