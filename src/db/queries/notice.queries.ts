import db from "@db";
import { Notice, TNoticeInsert, TNoticeUpdate } from "@schemas";
import { eq } from "drizzle-orm";

const NoticeServices = {
  get: async (isActive?: boolean) => {
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
  getByCode: async (code: string) => {
    const results = await db
      .select()
      .from(Notice.table)
      .where(eq(Notice.table.language_code, code.toLowerCase()));
    return results;
  },
  insert: async (data: TNoticeInsert) => {
    const row = await db.insert(Notice.table).values(data);
    return row.rowsAffected > 0;
  },
  update: async (id: number, data: TNoticeUpdate) => {
    const updatedRow = await db
      .update(Notice.table)
      .set(data)
      .where(eq(Notice.table.id, id));
    return updatedRow.rowsAffected > 0;
  },
  delete: async (id: number) => {
    const deletedRow = await db
      .delete(Notice.table)
      .where(eq(Notice.table.id, id));
    return deletedRow.rowsAffected > 0;
  },
};

export default NoticeServices;
