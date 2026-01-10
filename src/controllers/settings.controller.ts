import { SettingsServices } from "@queries";
import { TSettingsUpdate } from "@schemas";
import { respond, SettingsColumn } from "@utils";
import { NotFoundError } from "elysia";

const SettingsController = {
  get: async () => {
    const settings = await SettingsServices.get();
    if (!settings) throw new NotFoundError("Settings not found");
    return respond(true, "Settings fetched successfully", settings);
  },
  getByColumn: async ({
    params: { column },
  }: {
    params: { column: SettingsColumn };
  }) => {
    const value = await SettingsServices.getByColumn(column);
    if (value === null) throw new NotFoundError("Value not found");
    return respond(true, "Value fetched successfully", value);
  },
  update: async ({ body }: { body: TSettingsUpdate }) => {
    const updated = await SettingsServices.update(body);
    if (!updated) throw new NotFoundError("Settings not updated");
    return respond(true, "Settings updated successfully", updated);
  },
};
export default SettingsController;
