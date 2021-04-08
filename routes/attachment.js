import express from "express";
const router = express.Router();

const attachmentController = require("../controllers/attachment");

router
  .route("/")
  .get(attachmentController.getAllAttachments)
  .post(attachmentController.createAttachment);

router.use("/:id", attachmentController.getAttachmentById);

router
  .route("/:id")
  .get((request, response, next) => {
    response.status(200).send(request.attachment);
  })
  .put(attachmentController.updateAttachmentById)
  .delete(attachmentController.deleteAttachmentById);
export default router;