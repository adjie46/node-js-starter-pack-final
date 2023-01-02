const model = require("../../../database/models/index");
const responseStatus = require("../../../helper/responseStatus");
const myFunction = require("../../../helper/myFunction");
const messages = require("../../../helper/messages");
const config = require("../../../config/config");
const {
    Op
} = require("sequelize");

const logMiddleware = require("../../../middleware/log.middleware");

const uploadFile = require("../../../middleware/upload.middleware");

exports.getWebDetail = async (req, res, next) => {
    try {
        await uploadFile(req, res);

        webData = await model.gWeb.findAll({
            limit: 1
        })

        return res.status(responseStatus.OK).json({
            success: true,
            code: responseStatus.OK,
            message: messages.dataFound,
            data: webData
        });

    } catch (error) {
        if (error.message == messages.notAllowed) {
            return res.status(responseStatus.serverError).send({
                success: false,
                code: responseStatus.serverError,
                message: messages.fileIsNotAllowed,
            });
        } else if (error.message == messages.fileToLarge) {
            return res.status(responseStatus.serverError).send({
                success: false,
                code: responseStatus.serverError,
                message: messages.fileToLargeMessage,
            });
        }
    }
}