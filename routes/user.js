import express from "express";
const router = express.Router();
const userController = require("../controllers/user");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.use("/:id", userController.getUserById);

router
  .route("/:id")
  .get((request, response, next) => {
    response.status(200).send(request.user);
  })
  .put(userController.updateUserById)
  .delete(userController.deleteUserById);
export default router;
