import express from "express";
const router = express.Router();

const workspacesController = require("../controllers/workspace");

router
  .route("/")
  .get(workspacesController.getAllWorkspace)
  .post(workspacesController.createWorkspace);

router.use("/:id", workspacesController.getWorkspaceById);

router
  .route("/:id")
  .get((request, response, next) => {
    response.status(200).send(request.workspaces);
  })
  .put(workspacesController.updateWorkspaceById)
  .delete(workspacesController.deleteWorspaceById);
export default router;
