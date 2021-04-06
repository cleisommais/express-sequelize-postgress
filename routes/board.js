import express from "express";
const router = express.Router();

const boardController = require("../controllers/board");

router
  .route("/")
  .get(boardController.getAllBoards)
  .post(boardController.createBoard);

router.use("/:id", boardController.getBoardById);

router
  .route("/:id")
  .get((request, response, next) => {
    response.status(200).send(request.board);
  })
  .put(boardController.updateBoardById)
  .delete(boardController.deleteBoardById);
export default router;