import { Settings } from "../../db/schema/index.js";

const SettingsValidator = {
  update: (req, res, next) => {
    Settings.schema.update.parse(req.body);
    next();
  },
};

export default SettingsValidator;
