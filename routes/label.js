import express from "express";
const router = express.Router();

const labelController = require("../controllers/label");

router
  .route("/")
  .get(labelController.getAllLabels)
  .post(labelController.createLabel);

router.use("/:id", labelController.getLabelById);

router
  .route("/:id")
  .get((request, response, next) => {
    response.status(200).send(request.label);
  })
  .put(labelController.updateLabelById)
  .delete(labelController.deleteLabelById);
export default router;