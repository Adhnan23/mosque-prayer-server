import { Elysia } from "elysia";
import { NoticeValidator } from "../middlewares/validator";
import { NoticeController } from "../controllers";

const noticeRoute = new Elysia({ prefix: "/notice" })
  .get("/", NoticeController.getAll, NoticeValidator.getAll)
  .get("/refresh", NoticeController.refresh)
  .get("/:id", NoticeController.get, NoticeValidator.get)
  .post("/", NoticeController.insert, NoticeValidator.insert)
  .put("/:id", NoticeController.update, NoticeValidator.update)
  .delete("/:id", NoticeController.delete, NoticeValidator.delete);
export default noticeRoute;
