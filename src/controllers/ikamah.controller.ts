import { IkamahServices } from "@queries";
import { TIkamahUpdate } from "@schemas";
import { respond } from "@utils";
import { NotFoundError } from "elysia";
import { formatTimeRecursive, TFormat } from "src/utils/time";

const IkamahController = {
  get: async () => {
    const ikamah = await IkamahServices.get();
    if (!ikamah) throw new NotFoundError("Ikamah not found");
    return respond(true, "Ikamah fetched successfully", ikamah);
  },
  time: async ({ query: { format } }: { query: { format: TFormat } }) => {
    const time = await IkamahServices.time();
    if (!time) throw new NotFoundError("Ikamah not found");
    return respond(
      true,
      "Time fetched successfully",
      formatTimeRecursive(time, format)
    );
  },
  update: async ({ body }: { body: TIkamahUpdate }) => {
    const ikamah = await IkamahServices.update(body);
    if (!ikamah) throw new NotFoundError("Ikamah not found");
    return respond(true, "Ikamah updated successfully", ikamah);
  },
};

export default IkamahController;
