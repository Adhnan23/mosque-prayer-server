import z from "zod";
import { Notice } from "../../db/schemas/notice.table";
import { paramId } from "../../utils/schemas";

const NoticeValidator = {
  get: {
    params: z.object({
      id: paramId,
    }),
    // detail: {
    //   summary: "Get Notice by ID",
    //   description: "Retrieve a single notice by its ID",
    //   tags: ["Notice"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: Notice.schema.select,
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
  getAll: {
    query: z.object({
      isActive: z
        .string()
        .optional()
        .transform((val) => {
          if (val === "true") return true;
          if (val === "false") return false;
          return undefined;
        }),
    }),
    // detail: {
    //   summary: "Get All Notices",
    //   description:
    //     "Retrieve all notices, optionally filtering by active status",
    //   tags: ["Notice"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: z.array(Notice.schema.select),
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
  insert: {
    body: Notice.schema.insert,
    // detail: {
    //   summary: "Insert Notice",
    //   description: "Create a new notice",
    //   tags: ["Notice"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: Notice.schema.select,
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
  update: {
    params: z.object({
      id: paramId,
    }),
    body: Notice.schema.update,
    // detail: {
    //   summary: "Update Notice",
    //   description: "Update a notice by ID",
    //   tags: ["Notice"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: Notice.schema.select,
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
  delete: {
    params: z.object({
      id: paramId,
    }),
    // detail: {
    //   summary: "Delete Notice",
    //   description: "Delete a notice by ID",
    //   tags: ["Notice"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: Notice.schema.select,
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
};

export default NoticeValidator;
