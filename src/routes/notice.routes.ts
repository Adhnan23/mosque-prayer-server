import { NoticeController } from "@controllers";
import { NoticeValidator } from "@validators";
import Elysia from "elysia";

const NoticeRoute = new Elysia({ prefix: "/notice" })
  .get("/", NoticeController.get, NoticeValidator.get)
  .get("/:id", NoticeController.getById, NoticeValidator.getById)
  .get("/code/:code", NoticeController.getByCode, NoticeValidator.getByCode)
  .post("/", NoticeController.insert, NoticeValidator.insert)
  .put("/:id", NoticeController.update, NoticeValidator.update)
  .delete("/:id", NoticeController.delete, NoticeValidator.delete);

export default NoticeRoute;
