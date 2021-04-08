import { ValidationError } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import model from "../models";
const { Invite } = model;

const getAllInvites = async (request, response, next) => {
    //Retrieve all invites
    try {
        let inviteList = await Invite.findAll();
        response.status(200).send(inviteList);
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

const createInvite = async (request, response, next) => {
    //create a new invite
    try {
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            if(!request.body.url){                
                let ip = request.ip.split(":")
                request.body.url = `http://${ip[ip.length - 1]}/${uuidv4()}`;
            }
            let invite = await Invite.create(request.body);
            response.status(201).send(invite);
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

const getInviteById = async (request, response, next) => {
    //Retrieve one invite by id
    try {
        const id = request.params.id;
        let invite = await Invite.findByPk(id);
        if (invite == null) {
            response.status(404).json({
                message: `Invite id ${id} not found`,
            });
            next(`Invite id ${id} not found`);
        } else {
            request.invite = invite;
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

const updateInviteById = async (request, response, next) => {
    //Update one invite by id
    try {
        const inviteId = request.params.id;
        let invite = await Invite.update(request.body, {
            where: { id: inviteId },
        });
        if (invite == 1) {
            response.status(202).json({
                message: "Invite updated",
            });
        } else {
            response.status(400).json({
                message: "Invite NOT updated",
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

const deleteInviteById = async (request, response, next) => {
    //Delete one invite by id
    try {
        const inviteId = request.params.id;
        let invite = await Invite.destroy({ where: { id: inviteId } });
        if (invite == 1) {
            response.status(204).send();
        } else {
            response.status(400).json({
                message: "Invite NOT deleted",
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
    getAllInvites,
    createInvite,
    getInviteById,
    updateInviteById,
    deleteInviteById,
};
