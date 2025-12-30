import z from "zod";

const SettingsValidator = {
  get: {
    params: z.object({
      name: z.string().min(2).max(20),
    }),
    // detail: {
    //   summary: "Get Setting by Name",
    //   description: "Retrieve a single setting by its name",
    //   tags: ["Settings"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: Settings.schema.select,
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
    // detail: {
    //   summary: "Get All Settings",
    //   description: "Retrieve all settings from the database",
    //   tags: ["Settings"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: z.array(Settings.schema.select),
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
    body: z.object({
      name: z.string().min(2).max(20),
      value: z.string().min(1).max(20),
    }),
    // detail: {
    //   summary: "Update Setting",
    //   description: "Update a setting by its name",
    //   tags: ["Settings"],
    // },
    // response: {
    //   200: z.object({
    //     success: z.literal(true),
    //     message: z.string(),
    //     data: Settings.schema.select,
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
export default SettingsValidator;
