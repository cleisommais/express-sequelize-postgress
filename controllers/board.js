import { ValidationError } from "sequelize";
import model from "../models";
const { Board } = model;

const getAllBoards = async (request, response, next) => {
    //Retrieve all boards
    try {
        let boardList = await Board.findAll();
        response.status(200).send(boardList);
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

const createBoard = async (request, response, next) => {
    //create a new board
    try {
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            let board = await Board.create(request.body);
            response.status(201).send(board);
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

const getBoardById = async (request, response, next) => {
    //Retrieve one board by id
    try {
        const id = request.params.id;
        let board = await Board.findByPk(id);
        if (board == null) {
            response.status(404).json({
                message: `Board id ${id} not found`,
            });
            console.log(`Board id ${id} not found`);
            next(`Board id ${id} not found`);
        } else {
            request.board = board;
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

const updateBoardById = async (request, response, next) => {
    //Update one board by id
    try {
        const boardId = request.params.id;
        let board = await Board.update(request.body, {
            where: { id: boardId },
        });
        if (board == 1) {
            response.status(202).json({
                message: "Board updated",
            });
        } else {
            response.status(400).json({
                message: "Board NOT updated",
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

const deleteBoardById = async (request, response, next) => {
    //Delete one board by id
    try {
        const boardId = request.params.id;
        let board = await Board.destroy({ where: { id: boardId } });
        if (board == 1) {
            response.status(204).send();
        } else {
            response.status(400).json({
                message: "Board NOT deleted",
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
    getAllBoards,
    createBoard,
    getBoardById,
    updateBoardById,
    deleteBoardById,
};