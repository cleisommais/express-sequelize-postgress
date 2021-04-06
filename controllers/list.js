import { ValidationError } from "sequelize";
import model from "../models";
const { List } = model;

const getAllLists = async (request, response, next) => {
    //Retrieve all lists
    try {
        let listList = await List.findAll();
        response.status(200).send(listList);
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

const createList = async (request, response, next) => {
    //create a new list
    try {
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            let list = await List.create(request.body);
            response.status(201).send(list);
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

const getListById = async (request, response, next) => {
    //Retrieve one list by id
    try {
        const id = request.params.id;
        let list = await List.findByPk(id);
        if (list == null) {
            response.status(404).json({
                message: `List id ${id} not found`,
            });
            next(`List id ${id} not found`);
        } else {
            request.list = list;
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

const updateListById = async (request, response, next) => {
    //Update one list by id
    try {
        const listId = request.params.id;
        let list = await List.update(request.body, {
            where: { id: listId },
        });
        if (list == 1) {
            response.status(202).json({
                message: "List updated",
            });
        } else {
            response.status(400).json({
                message: "List NOT updated",
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

const deleteListById = async (request, response, next) => {
    //Delete one list by id
    try {
        const listId = request.params.id;
        let list = await List.destroy({ where: { id: listId } });
        if (list == 1) {
            response.status(204).send();
        } else {
            response.status(400).json({
                message: "List NOT deleted",
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
    getAllLists,
    createList,
    getListById,
    updateListById,
    deleteListById,
};