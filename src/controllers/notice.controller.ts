import { NotFoundError } from "elysia";
import { NoticeSerivces } from "../db/services";
import respond from "../utils/respond";
import { TNoticeInsert, TNoticeUpdate } from "../db/schemas/notice.table";

const NoticeController = {
  get: async ({ params: { id } }: { params: { id: number } }) => {
    const data = await NoticeSerivces.get(id);
    if (!data) throw new NotFoundError("Notice not found");
    return respond(true, "Notice retrieved successfully", data);
  },
  getAll: async ({
    query: { isActive },
  }: {
    query: { isActive?: boolean };
  }) => {
    const data = await NoticeSerivces.getAll(isActive);
    if (!data) throw new NotFoundError("No notices found");
    return respond(true, "Notices retrieved successfully", data);
  },
  refresh: async () => {
    const notices = await NoticeSerivces.getAll();

    if (!notices || notices.length === 0) {
      throw new NotFoundError("No notices found");
    }
    const today = new Date().toISOString().split("T")[0];
    const updatedNotices = [];
    for (const notice of notices) {
      const shouldBeActive =
        today >= notice.startDate && today <= notice.endDate;
      if (notice.isActive !== shouldBeActive) {
        const updated = await NoticeSerivces.update(notice.id, {
          isActive: shouldBeActive,
        });
        if (updated) updatedNotices.push(updated);
      }
    }
    return respond(true, "Notices refreshed successfully", updatedNotices);
  },
  insert: async ({ body }: { body: TNoticeInsert }) => {
    let payload = { ...body };
    if (payload.isActive === undefined) {
      const today = new Date().toISOString().split("T")[0];
      payload.isActive = today >= payload.startDate && today <= payload.endDate;
    }
    const data = await NoticeSerivces.insert(payload);
    if (!data) throw new NotFoundError("Failed to insert notice");
    return respond(true, "Notice inserted successfully", data);
  },
  update: async ({
    params: { id },
    body,
  }: {
    params: { id: number };
    body: TNoticeUpdate;
  }) => {
    const data = await NoticeSerivces.update(id, body);
    if (!data) throw new NotFoundError("Notice not found");
    return respond(true, "Notice updated successfully", data);
  },
  delete: async ({ params: { id } }: { params: { id: number } }) => {
    const data = await NoticeSerivces.delete(id);
    if (!data) throw new NotFoundError("Notice not found");
    return respond(true, "Notice deleted successfully", data);
  },
};

export default NoticeController;
