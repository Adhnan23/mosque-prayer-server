import { NoticeServices } from "@queries";
import { Notice, TNoticeInsert, TNoticeUpdate } from "@schemas";
import { respond } from "@utils";
import { InternalServerError, NotFoundError, status } from "elysia";

const NoticeController = {
  get: async ({ query: { isActive } }: { query: { isActive?: boolean } }) => {
    const notices =
      isActive === undefined
        ? await NoticeServices.get()
        : await NoticeServices.get(isActive);
    if (!notices) throw new NotFoundError("No notices found");
    return respond(true, "Notices fetched successfully", notices);
  },
  getById: async ({ params: { id } }: { params: { id: number } }) => {
    const notice = await NoticeServices.getById(id);
    if (!notice) throw new NotFoundError("Notice not found");
    return respond(true, "Notice fetched successfully", notice);
  },
  getByCode: async ({ params: { code } }: { params: { code: string } }) => {
    const notices = await NoticeServices.getByCode(code);
    if (!notices) throw new NotFoundError("No notices found");
    return respond(true, "Notices fetched successfully", notices);
  },
  insert: async ({ body }: { body: TNoticeInsert }) => {
    const start = new Date(body.start_date);
    const end = new Date(body.end_date);
    if (start > end) return status(400, respond(false, "Invalid date range"));

    const notice = await NoticeServices.insert(body);
    if (!notice) throw new InternalServerError("Failed to insert notice");
    return respond(true, "Notice inserted successfully", notice);
  },
  update: async ({
    params: { id },
    body,
  }: {
    params: { id: number };
    body: TNoticeUpdate;
  }) => {
    if (body.start_date || body.end_date) {
      const prev = await NoticeServices.getById(id);
      if (!prev) throw new NotFoundError("Notice not found");
      const start = new Date(body.start_date || prev.start_date);
      const end = new Date(body.end_date || prev.end_date);
      if (start > end) return status(400, respond(false, "Invalid date range"));
    }
    const updatedNotice = await NoticeServices.update(id, body);
    if (!updatedNotice)
      throw new InternalServerError("Failed to update notice");
    return respond(true, "Notice updated successfully", updatedNotice);
  },
  delete: async ({ params: { id } }: { params: { id: number } }) => {
    const deletedNotice = await NoticeServices.delete(id);
    if (!deletedNotice)
      throw new InternalServerError("Failed to delete notice");
    return respond(true, "Notice deleted successfully", deletedNotice);
  },
};

export default NoticeController;
