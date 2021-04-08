import { ValidationError } from "sequelize";
import model from "../models";
const { Activity } = model;

const getAllActivities = async (request, response, next) => {
    //Retrieve all activities
    try {
        let activityList = await Activity.findAll();
        response.status(200).send(activityList);
    } catch (error) {
        const message = processValidationError(error);
        if (error instanceof ValidationError) {
            response.status(400).json({
                message: message,
            });
        } else {
            console.log(error);
            response.status(500).json({
                message: error.message,
            });
        }
        next(error);
    }
};

const createActivity = async (request, response, next) => {
    //create a new activity
    try {
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            let activity = await Activity.create(request.body);
            response.status(201).send(activity);
        }
    } catch (error) {
        const message = processValidationError(error);
        if (error instanceof ValidationError) {
            response.status(400).json({
                message: message,
            });
        } else {
            console.log(error);
            response.status(500).json({
                message: error.message,
            });
        }
        next(error);
    }
};

const getActivityById = async (request, response, next) => {
    //Retrieve one activity by id
    try {
        const id = request.params.id;
        let activity = await Activity.findByPk(id);
        if (activity == null) {
            response.status(404).json({
                message: `Activity id ${id} not found`,
            });
            next(`Activity id ${id} not found`);
        } else {
            request.activity = activity;
            next();
        }
    } catch (error) {
        const message = processValidationError(error);
        if (error instanceof ValidationError) {
            response.status(400).json({
                message: message,
            });
        } else {
            console.log(error);
            response.status(500).json({
                message: error.message,
            });
        }
        next(error);
    }
};

const updateActivityById = async (request, response, next) => {
    //Update one activity by id
    try {
        const activityId = request.params.id;
        let activity = await Activity.update(request.body, {
            where: { id: activityId },
        });
        if (activity == 1) {
            response.status(202).json({
                message: "Activity updated",
            });
        } else {
            response.status(400).json({
                message: "Activity NOT updated",
            });
        }
    } catch (error) {
        const message = processValidationError(error);
        if (error instanceof ValidationError) {
            response.status(400).json({
                message: message,
            });
        } else {
            console.log(error);
            response.status(500).json({
                message: error.message,
            });
        }
        next(error);
    }
};

const deleteActivityById = async (request, response, next) => {
    //Delete one activity by id
    try {
        const activityId = request.params.id;
        let activity = await Activity.destroy({ where: { id: activityId } });
        if (activity == 1) {
            response.status(204).send();
        } else {
            response.status(400).json({
                message: "Activity NOT deleted",
            });
        }
    } catch (error) {
        const message = processValidationError(error);
        if (error instanceof ValidationError) {
            response.status(400).json({
                message: message,
            });
        } else {
            console.log(error);
            response.status(500).json({
                message: error.message,
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
    getAllActivities,
    createActivity,
    getActivityById,
    updateActivityById,
    deleteActivityById,
};