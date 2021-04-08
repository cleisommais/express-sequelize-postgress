import express from "express";
const router = express.Router();

const activityController = require("../controllers/activity");

router
  .route("/")
  .get(activityController.getAllActivities)
  .post(activityController.createActivity);

router.use("/:id", activityController.getActivityById);

router
  .route("/:id")
  .get((request, response, next) => {
    response.status(200).send(request.activity);
  })
  .put(activityController.updateActivityById)
  .delete(activityController.deleteActivityById);
export default router;