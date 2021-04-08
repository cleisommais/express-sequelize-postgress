import express from "express";
const router = express.Router();

const inviteController = require("../controllers/invite");

router
    .route("/")
    .get(inviteController.getAllInvites)
    .post(inviteController.createInvite);

router.use("/:id", inviteController.getInviteById);

router
    .route("/:id")
    .get((request, response, next) => {
        response.status(200).send(request.invite);
    })
    .put(inviteController.updateInviteById)
    .delete(inviteController.deleteInviteById);
export default router;
