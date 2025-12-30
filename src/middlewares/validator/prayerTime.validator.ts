import z from "zod";
import { PrayerTime } from "../../db/schemas";
import { limit, day, month, format } from "../../utils/schemas";

const PrayerTimeValidator = {
  getAll: {
    query: z.object({
      limit: limit,
      format: format,
    }),
    // detail: {
    //   summary: "Get All Prayer Times",
    //   description: "Retrieve all prayer times, optionally limited by a number",
    //   tags: ["PrayerTime"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: z.array(PrayerTime.schema.select),
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
  getMonthly: {
    params: z.object({
      month: month,
    }),
    query: z.object({
      limit: limit,
      format: format,
    }),
    // detail: {
    //   summary: "Get Monthly Prayer Times",
    //   description:
    //     "Retrieve prayer times for a specific month, optionally limited",
    //   tags: ["PrayerTime"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: z.array(PrayerTime.schema.select),
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
  get: {
    params: z.object({
      month: month,
      day: day,
    }),
    query: z.object({
      format: format,
    }),
    // detail: {
    //   summary: "Get Prayer Time by Day and Month",
    //   description: "Retrieve prayer time for a specific day and month",
    //   tags: ["PrayerTime"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: PrayerTime.schema.select,
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
  getInRange: {
    params: z.object({
      startMonth: month,
      startDay: day,
      endMonth: month,
      endDay: day,
    }),
    query: z.object({
      format: format,
    }),
    // detail: {
    //   summary: "Get Prayer Times in Range",
    //   description: "Retrieve prayer times between start and end day/month",
    //   tags: ["PrayerTime"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: z.array(PrayerTime.schema.select),
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
  today: {
    query: z.object({
      format: format,
    }),
  },
  update: {
    params: z.object({
      month: month,
      day: day,
    }),
    body: PrayerTime.schema.update,
    // detail: {
    //   summary: "Update Prayer Time by Day and Month",
    //   description: "Update prayer time for a specific day and month",
    //   tags: ["PrayerTime"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: PrayerTime.schema.select,
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
  updateByRange: {
    params: z.object({
      startMonth: month,
      startDay: day,
      endMonth: month,
      endDay: day,
    }),
    body: PrayerTime.schema.update,
    // detail: {
    //   summary: "Update Prayer Times in Range",
    //   description: "Update prayer times between start and end day/month",
    //   tags: ["PrayerTime"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: z.array(PrayerTime.schema.select),
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
export default PrayerTimeValidator;
