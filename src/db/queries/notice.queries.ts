import db from "@db";
import { Notice, TNoticeInsert, TNoticeUpdate } from "@schemas";
import { eq } from "drizzle-orm";

const NoticeServices = {
  get: async (isActive: boolean | undefined = undefined) => {
    const results =
      isActive === undefined
        ? await db.select().from(Notice.table)
        : await db
            .select()
            .from(Notice.table)
            .where(eq(Notice.table.is_active, isActive));
    return results;
  },
  getById: async (id: number) => {
    const [result] = await db
      .select()
      .from(Notice.table)
      .where(eq(Notice.table.id, id));
    return result;
  },
  insert: async (data: TNoticeInsert) => {
    const [row] = await db.insert(Notice.table).values(data).returning();
    return row;
  },
  update: async (id: number, data: TNoticeUpdate) => {
    const updatedRow = await db
      .update(Notice.table)
      .set(data)
      .where(eq(Notice.table.id, id));
    return updatedRow;
  },
  delete: async (id: number) =>
    db.delete(Notice.table).where(eq(Notice.table.id, id)),
};

export default NoticeServices;
