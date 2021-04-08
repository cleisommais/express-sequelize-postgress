import { ValidationError } from "sequelize";
import model from "../models";
const { Label } = model;

const getAllLabels = async (request, response, next) => {
    //Retrieve all labels
    try {
        let labelList = await Label.findAll();
        response.status(200).send(labelList);
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

const createLabel = async (request, response, next) => {
    //create a new label
    try {
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            let label = await Label.create(request.body);
            response.status(201).send(label);
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

const getLabelById = async (request, response, next) => {
    //Retrieve one label by id
    try {
        const id = request.params.id;
        let label = await Label.findByPk(id);
        if (label == null) {
            response.status(404).json({
                message: `Label id ${id} not found`,
            });
            next(`Label id ${id} not found`);
        } else {
            request.label = label;
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

const updateLabelById = async (request, response, next) => {
    //Update one label by id
    try {
        const labelId = request.params.id;
        let label = await Label.update(request.body, {
            where: { id: labelId },
        });
        if (label == 1) {
            response.status(202).json({
                message: "Label updated",
            });
        } else {
            response.status(400).json({
                message: "Label NOT updated",
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

const deleteLabelById = async (request, response, next) => {
    //Delete one label by id
    try {
        const labelId = request.params.id;
        let label = await Label.destroy({ where: { id: labelId } });
        if (label == 1) {
            response.status(204).send();
        } else {
            response.status(400).json({
                message: "Label NOT deleted",
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
    getAllLabels,
    createLabel,
    getLabelById,
    updateLabelById,
    deleteLabelById,
};