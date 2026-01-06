import { Ikamah } from "@schemas";
import { timeFormat } from "@utils";
import z from "zod";

const IkamahValidator = {
  get: {},
  time: {
    query: z
      .object({
        format: timeFormat,
      })
      .strict(),
  },
  update: {
    body: Ikamah.schema.update.strict(),
  },
};

export default IkamahValidator;
