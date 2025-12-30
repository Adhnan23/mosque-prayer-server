import { eq } from "drizzle-orm";
import db from "..";
import { Notice, TNoticeInsert, TNoticeUpdate } from "../schemas/notice.table";

const NoticeSerivces = {
  get: async (id: number) => {
    const [data] = await db
      .select()
      .from(Notice.table)
      .where(eq(Notice.table.id, id));
    return data;
  },
  getAll: async (isActive?: boolean) => {
    let query = db.select().from(Notice.table).$dynamic();
    if (isActive !== undefined) {
      query = query.where(eq(Notice.table.isActive, isActive));
    }
    const data = await query;
    return data;
  },
  insert: async (data: TNoticeInsert) => {
    const [inserted] = await db.insert(Notice.table).values(data).returning();
    return inserted;
  },
  update: async (id: number, data: TNoticeUpdate) => {
    const [updated] = await db
      .update(Notice.table)
      .set(data)
      .where(eq(Notice.table.id, id))
      .returning();
    return updated;
  },
  delete: async (id: number) => {
    const [deleted] = await db
      .delete(Notice.table)
      .where(eq(Notice.table.id, id))
      .returning();
    return deleted;
  },
};

export default NoticeSerivces;
