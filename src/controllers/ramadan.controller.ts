import { NotFoundError } from "elysia";
import { RamadanServices } from "../db/services";
import respond from "../utils/respond";
import { TRamadanUpdate } from "../db/schemas";
import { collectiveTimeFormatter } from "../utils/schemas";

const RamadanController = {
  get: async ({ query: { format } }: { query: { format?: "12h" | "24h" } }) => {
    const data = await RamadanServices.get();
    if (!data) throw new NotFoundError("Ramadan data not found");
    return respond(
      true,
      "Ramadan data retrieved successfully",
      collectiveTimeFormatter(format).parse(data)
    );
  },
  update: async ({ body }: { body: TRamadanUpdate }) => {
    const data = await RamadanServices.update(body);
    if (!data) throw new NotFoundError("Ramadan data not found");
    return respond(true, "Ramadan data updated successfully", data);
  },
};

export default RamadanController;
