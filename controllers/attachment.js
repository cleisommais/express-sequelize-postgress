import { ValidationError } from "sequelize";
import model from "../models";
const { Attachment } = model;

const getAllAttachments = async (request, response, next) => {
    //Retrieve all attachments
    try {
        let attachmentList = await Attachment.findAll();
        response.status(200).send(attachmentList);
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

const createAttachment = async (request, response, next) => {
    //create a new attachment
    try {
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            let attachment = await Attachment.create(request.body);
            response.status(201).send(attachment);
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

const getAttachmentById = async (request, response, next) => {
    //Retrieve one attachment by id
    try {
        const id = request.params.id;
        let attachment = await Attachment.findByPk(id);
        if (attachment == null) {
            response.status(404).json({
                message: `Attachment id ${id} not found`,
            });
            next(`Attachment id ${id} not found`);
        } else {
            request.attachment = attachment;
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

const updateAttachmentById = async (request, response, next) => {
    //Update one attachment by id
    try {
        const attachmentId = request.params.id;
        let attachment = await Attachment.update(request.body, {
            where: { id: attachmentId },
        });
        if (attachment == 1) {
            response.status(202).json({
                message: "Attachment updated",
            });
        } else {
            response.status(400).json({
                message: "Attachment NOT updated",
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

const deleteAttachmentById = async (request, response, next) => {
    //Delete one attachment by id
    try {
        const attachmentId = request.params.id;
        let attachment = await Attachment.destroy({ where: { id: attachmentId } });
        if (attachment == 1) {
            response.status(204).send();
        } else {
            response.status(400).json({
                message: "Attachment NOT deleted",
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
    getAllAttachments,
    createAttachment,
    getAttachmentById,
    updateAttachmentById,
    deleteAttachmentById,
};