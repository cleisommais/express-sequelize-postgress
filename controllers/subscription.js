import { ValidationError } from "sequelize";
import model from "../models";
const { Subscription } = model;

const getAllSubscriptions = async (request, response, next) => {
    //Retrieve all subscriptions
    try {
        let subscriptionList = await Subscription.findAll();
        response.status(200).send(subscriptionList);
    } catch (error) {
        let message = processValidationError(error);
        if (error instanceof ValidationError) {
            response.status(400).json({
                message: message,
            });
        } else {
            console.log(error);
            response.status(500).json({
                message: error,
            });
        }
        next(error);
    }
};

const createSubscription = async (request, response, next) => {
    //create a new subscription
    try {
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            let subscription = await Subscription.create(request.body);
            response.status(201).send(subscription);
        }
    } catch (error) {
        let message = processValidationError(error);
        if (error instanceof ValidationError) {
            response.status(400).json({
                message: message,
            });
        } else {
            console.log(error);
            response.status(500).json({
                message: error,
            });
        }
        next(error);
    }
};

const getSubscriptionById = async (request, response, next) => {
    //Retrieve one subscription by id
    try {
        const id = request.params.id;
        let subscription = await Subscription.findByPk(id);
        if (subscription == null) {
            response.status(404).json({
                message: `Subscription id ${id} not found`,
            });
            console.log(`Subscription id ${id} not found`);
            next(`Subscription id ${id} not found`);
        } else {
            request.subscription = subscription;
            next();
        }
    } catch (error) {
        let message = processValidationError(error);
        if (error instanceof ValidationError) {
            response.status(400).json({
                message: message,
            });
        } else {
            console.log(error);
            response.status(500).json({
                message: error,
            });
        }
        next(error);
    }
};

const updateSubscriptionById = async (request, response, next) => {
    //Update one subscription by id
    try {
        const subscriptionId = request.params.id;
        let subscription = await Subscription.update(request.body, {
            where: { id: subscriptionId },
        });
        if (subscription == 1) {
            response.status(202).json({
                message: "Subscription updated",
            });
        } else {
            response.status(400).json({
                message: "Subscription NOT updated",
            });
        }
    } catch (error) {
        let message = processValidationError(error);
        if (error instanceof ValidationError) {
            response.status(400).json({
                message: message,
            });
        } else {
            console.log(error);
            response.status(500).json({
                message: error,
            });
        }
        next(error);
    }
};

const deleteSubscriptionById = async (request, response, next) => {
    //Delete one subscription by id
    try {
        const subscriptionId = request.params.id;
        let subscription = await Subscription.destroy({
            where: { id: subscriptionId },
        });
        if (subscription == 1) {
            response.status(204).send();
        } else {
            response.status(400).json({
                message: "Subscription NOT deleted",
            });
        }
    } catch (error) {
        let message = processValidationError(error);
        if (error instanceof ValidationError) {
            response.status(400).json({
                message: message,
            });
        } else {
            console.log(error);
            response.status(500).json({
                message: error,
            });
        }
        next(error);
    }
};

function processValidationError(error) {
    let errorResponseConcat = "";
    if (error instanceof ValidationError) {
        error.errors.forEach((error) => {
            if (error.message) {
                if (errorResponseConcat === "") {
                    errorResponseConcat = error.message;
                } else {
                    errorResponseConcat =
                        errorResponseConcat + ", " + error.message;
                }
            }
        });
    }
    console.log("Error response: " + errorResponseConcat);
    return errorResponseConcat;
}

export {
    getAllSubscriptions,
    createSubscription,
    getSubscriptionById,
    updateSubscriptionById,
    deleteSubscriptionById,
};