import { ValidationError } from "sequelize";
import model from "../models";
const { Card, User, UserCard, LabelCard, Label } = model;

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
            let card = await Card.create(request.body, {
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
        if (id == undefined || id === "" || id == null) {
            response.status(400).json({
                message: "Id user is required",
            });
            next(`Card id ${id} not found`);
        } else {
            let card = await Card.findByPk(id);
            if (card == null) {
                response.status(404).json({
                    message: `Card id ${id} not found`,
                });
                next(`Card id ${id} not found`);
            } else {
                request.card = card;
                next();
            }
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

const addUsersToCard = async (request, response, next) => {
    try {
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            const cardId = request.params.id;
            const userIdArray = request.body;
            let userCardArray = [];
            userIdArray.forEach((element) => {
                userCardArray.push({ userId: element.userId, cardId: cardId });
            });
            let userCard = await UserCard.bulkCreate(userCardArray);
            response.status(201).send(userCard);
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

const removeUsersFromCard = async (request, response, next) => {
    try {
        const cardId = parseInt(request.params.id);
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            const userIdArray = request.body;
            userIdArray.forEach(async (element) => {
                await UserCard.destroy({
                    where: { userId: element.userId, cardId: cardId },
                });
            });
            response.status(204).send();
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

const listAllUsersFromCard = async (request, response, next) => {
    try {
        const id = request.params.id;
        let card = await Card.findByPk(id, {
            include: [{ model: User, required: false }],
        });
        response.status(200).send(card);
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

const addLabelsToCard = async (request, response, next) => {
    try {
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            const cardId = request.params.id;
            const labelIdArray = request.body;
            let labelCardArray = [];
            labelIdArray.forEach((element) => {
                labelCardArray.push({
                    labelId: element.labelId,
                    cardId: cardId,
                });
            });
            let labelCard = await LabelCard.bulkCreate(labelCardArray);
            response.status(201).send(labelCard);
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

const removeLabelsFromCard = async (request, response, next) => {
    try {
        const cardId = parseInt(request.params.id);
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            const labelIdArray = request.body;
            labelIdArray.forEach(async (element) => {
                await LabelCard.destroy({
                    where: { labelId: element.labelId, cardId: cardId },
                });
            });
            response.status(204).send();
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

const listAllLabelsFromCard = async (request, response, next) => {
    try {
        const id = request.params.id;
        let card = await Card.findByPk(id, {
            include: [{ model: Label, required: false }],
        });
        response.status(200).send(card);
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
    return errorResponseConcat;
}

export {
    getAllCards,
    createCard,
    getCardById,
    updateCardById,
    deleteCardById,
    addUsersToCard,
    removeUsersFromCard,
    listAllUsersFromCard,
    addLabelsToCard,
    removeLabelsFromCard,
    listAllLabelsFromCard,
};
