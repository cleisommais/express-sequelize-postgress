import { ValidationError } from "sequelize";
import model from "../models";
const { Checklist } = model;

const getAllChecklists = async (request, response, next) => {
    //Retrieve all checklists
    try {
        let checklistList = await Checklist.findAll();
        response.status(200).send(checklistList);
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

const createChecklist = async (request, response, next) => {
    //create a new checklist
    try {
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            let checklist = await Checklist.create(request.body);
            response.status(201).send(checklist);
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

const getChecklistById = async (request, response, next) => {
    //Retrieve one checklist by id
    try {
        const id = request.params.id;
        let checklist = await Checklist.findByPk(id);
        if (checklist == null) {
            response.status(404).json({
                message: `Checklist id ${id} not found`,
            });
            next(`Checklist id ${id} not found`);
        } else {
            request.checklist = checklist;
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

const updateChecklistById = async (request, response, next) => {
    //Update one checklist by id
    try {
        const checklistId = request.params.id;
        let checklist = await Checklist.update(request.body, {
            where: { id: checklistId },
        });
        if (checklist == 1) {
            response.status(202).json({
                message: "Checklist updated",
            });
        } else {
            response.status(400).json({
                message: "Checklist NOT updated",
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

const deleteChecklistById = async (request, response, next) => {
    //Delete one checklist by id
    try {
        const checklistId = request.params.id;
        let checklist = await Checklist.destroy({ where: { id: checklistId } });
        if (checklist == 1) {
            response.status(204).send();
        } else {
            response.status(400).json({
                message: "Checklist NOT deleted",
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
    getAllChecklists,
    createChecklist,
    getChecklistById,
    updateChecklistById,
    deleteChecklistById,
};