import z from "zod";
import { IkamahDelay } from "../../db/schemas";
import { format } from "../../utils/schemas";

const IkamahDelayValidator = {
  get: {
    // detail: {
    //   summary: "Get Ikamah Delay",
    //   description: "Fetch the current prayer delay configuration.",
    //   tags: ["Ikamah"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: IkamahDelay.schema.select,
    //   }),
    //   500: z.object({
    //     success: z.literal(false),
    //     message: z.string(),
    //     data: z.null(),
    //   }),
    // },
  },
  getTime: {
    query: z.object({ format }).strict(),
  },
  update: {
    body: IkamahDelay.schema.update,
    // detail: {
    //   summary: "Update Ikamah Delay",
    //   description:
    //     "Update one or more prayer delay values (0–60 minutes). All fields are optional.",
    //   tags: ["Ikamah"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: IkamahDelay.schema.select,
    //   }),
    //   400: z.object({
    //     success: z.literal(false),
    //     message: z.string(),
    //     data: z.any().optional(),
    //   }),
    //   404: z.object({
    //     success: z.literal(false),
    //     message: z.string(),
    //     data: z.null(),
    //   }),
    //   409: z.object({
    //     success: z.literal(false),
    //     message: z.string(),
    //     data: z.any().optional(),
    //   }),
    //   500: z.object({
    //     success: z.literal(false),
    //     message: z.string(),
    //     data: z.any().optional(),
    //   }),
    // },
  },
};
export default IkamahDelayValidator;
