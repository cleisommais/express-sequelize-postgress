  
import express from "express";
const router = express.Router();

const subscriptionController = require("../controllers/subscription");

router
  .route("/")
  .get(subscriptionController.getAllSubscriptions)
  .post(subscriptionController.createSubscription);

router.use("/:id", subscriptionController.getSubscriptionById);

router
  .route("/:id")
  .get((request, response, next) => {
    response.status(200).send(request.subscription);
  })
  .put(subscriptionController.updateSubscriptionById)
  .delete(subscriptionController.deleteSubscriptionById);
export default router;