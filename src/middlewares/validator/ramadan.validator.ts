import z from "zod";
import { Ramadan } from "../../db/schemas";
import { format } from "../../utils/schemas";
import { lang } from "../../utils/schemas bak";

const RamadanValidator = {
  get: {
    query: z.object({
      format: format,
      lang: lang,
    }),
    // detail: {
    //   summary: "Get Ramadan Times",
    //   description: "Retrieve suhur, sunset, and taraweeh times for Ramadan",
    //   tags: ["Ramadan"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: Ramadan.schema.select,
    //   }),
    //   404: z.object({
    //     success: z.literal(false),
    //     message: z.string(),
    //     data: z.null(),
    //   }),
    //   500: z.object({
    //     success: z.literal(false),
    //     message: z.string(),
    //     data: z.any().optional(),
    //   }),
    // },
  },
  update: {
    body: Ramadan.schema.update,
    // detail: {
    //   summary: "Update Ramadan Times",
    //   description: "Update one or more Ramadan time values",
    //   tags: ["Ramadan"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: Ramadan.schema.select,
    //   }),
    //   404: z.object({
    //     success: z.literal(false),
    //     message: z.string(),
    //     data: z.null(),
    //   }),
    //   400: z.object({
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
export default RamadanValidator;
