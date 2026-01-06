import { RamadanServices } from "@queries";
import { NotFoundError } from "elysia";
import { formatTimeRecursive, respond, TFormat } from "@utils";
import z from "zod";
import { Ramadan } from "@schemas";

const RamadanController = {
  get: async ({ query: { format } }: { query: { format: TFormat } }) => {
    const ramadan = await RamadanServices.get();
    if (!ramadan) throw new NotFoundError("Ramadan not found");
    return respond(
      true,
      "Ramadan fetched successfully",
      formatTimeRecursive(ramadan, format)
    );
  },
  update: async ({ body }: { body: z.infer<typeof Ramadan.schema.update> }) => {
    const ramadan = await RamadanServices.update(body);
    if (!ramadan) throw new NotFoundError("Ramadan not found");
    return respond(true, "Ramadan updated successfully", ramadan);
  },
};

export default RamadanController;
