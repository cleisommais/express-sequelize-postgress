import express from "express";
const router = express.Router();

const checklistController = require("../controllers/checklist");

router
  .route("/")
  .get(checklistController.getAllChecklists)
  .post(checklistController.createChecklist);

router.use("/:id", checklistController.getChecklistById);

router
  .route("/:id")
  .get((request, response, next) => {
    response.status(200).send(request.checklist);
  })
  .put(checklistController.updateChecklistById)
  .delete(checklistController.deleteChecklistById);
export default router;