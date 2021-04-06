import express from "express";
const router = express.Router();
const cardController = require("../controllers/card");

router
  .route("/")
  .get(cardController.getAllCards)
  .post(cardController.createCard);

router.use("/:id", cardController.getCardById);

router
  .route("/:id")
  .get((request, response, next) => {
    response.status(200).send(request.card);
  })
  .put(cardController.updateCardById)
  .delete(cardController.deleteCardById);
  
export default router;