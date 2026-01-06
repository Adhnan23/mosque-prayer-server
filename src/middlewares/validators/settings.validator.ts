import { Settings } from "@schemas";
import { settingsColumn } from "@utils";
import z from "zod";

const SettingsValidator = {
  get: {},
  getByColumn: {
    params: z.object({ column: settingsColumn }).strict(),
  },
  update: {
    body: Settings.schema.update.strict(),
  },
};

export default SettingsValidator;
