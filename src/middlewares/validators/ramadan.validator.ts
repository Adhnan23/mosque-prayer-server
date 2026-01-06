import { Ramadan } from "@schemas";
import { timeFormat } from "@utils";
import z from "zod";

const RamadanValidator = {
  get: {
    query: z.object({
      format: timeFormat,
    }),
  },
  update: {
    body: Ramadan.schema.update.strict(),
  },
};

export default RamadanValidator;
