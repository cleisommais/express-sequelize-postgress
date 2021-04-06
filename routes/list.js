import express from "express";
const router = express.Router();

const listController = require("../controllers/list");

router
  .route("/")
  .get(listController.getAllLists)
  .post(listController.createList);

router.use("/:id", listController.getListById);

router
  .route("/:id")
  .get((request, response, next) => {
    response.status(200).send(request.list);
  })
  .put(listController.updateListById)
  .delete(listController.deleteListById);
export default router;