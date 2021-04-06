import { ValidationError } from "sequelize";
import model from "../models";
const { Card, User } = model;

const getAllCards = async (request, response, next) => {
    //Retrieve all cards
    try {
        let cardList = await Card.findAll();
        response.status(200).send(cardList);
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

const createCard = async (request, response, next) => {
    //create a new card
    try {
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            let card = await Card.create(request.body,{
                include: [{ model: User, required: false }],
              });
            response.status(201).send(card);
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

const getCardById = async (request, response, next) => {
    //Retrieve one card by id
    try {
        const id = request.params.id;
        let card = await Card.findByPk(id, {
            include: [{ model: User, required: false }],
        });
        if (card == null) {
            response.status(404).json({
                message: `Card id ${id} not found`,
            });
            next(`Card id ${id} not found`);
        } else {
            request.card = card;
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

const updateCardById = async (request, response, next) => {
    //Update one card by id
    try {
        const cardId = request.params.id;
        let card = await Card.update(request.body, {
            where: { id: cardId },
        });
        if (card == 1) {
            response.status(202).json({
                message: "Card updated",
            });
        } else {
            response.status(400).json({
                message: "Card NOT updated",
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

const deleteCardById = async (request, response, next) => {
    //Delete one card by id
    try {
        const cardId = request.params.id;
        let card = await Card.destroy({ where: { id: cardId } });
        if (card == 1) {
            response.status(204).send();
        } else {
            response.status(400).json({
                message: "Card NOT deleted",
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
    getAllCards,
    createCard,
    getCardById,
    updateCardById,
    deleteCardById,
};