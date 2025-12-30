import { NotFoundError } from "elysia";
import { SettingsService } from "../db/services";
import respond from "../utils/respond";

const SettingsController = {
  get: async ({ params: { name } }: { params: { name: string } }) => {
    const data = await SettingsService.get(name);
    if (!data) throw new NotFoundError("Setting not found");
    return respond(true, "Setting retrieved successfully", data.value);
  },
  getAll: async () => {
    const data = await SettingsService.getAll();
    if (!data) throw new NotFoundError("Settings were empty");
    return respond(true, "Settings retrieved successfully", data);
  },
  update: async ({
    body: { name, value },
  }: {
    body: { name: string; value: string };
  }) => {
    const data = await SettingsService.update(name, value);
    if (!data || data.length === 0)
      throw new NotFoundError("Setting not found");
    return respond(true, "Setting updated successfully", data);
  },
};

export default SettingsController;
