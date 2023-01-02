const model = require("../../../database/models/index");
const responseStatus = require("../../../helper/responseStatus");
const myFunction = require("../../../helper/myFunction");
const messages = require("../../../helper/messages");
const config = require("../../../config/config");
const {
    Op
} = require("sequelize");

const {
    v5: uuidv5
} = require('uuid');

const logMiddleware = require("../../../middleware/log.middleware");

const uploadFile = require("../../../middleware/upload.middleware");

exports.showApiKey = async (req, res, next) => {
    try {
        await uploadFile(req, res);

        data = req.decrypted.payload;

        data = await model.gAccess.findAll({
            order: [
                ['createdAt', 'DESC'],
            ]
        })

        return res.status(responseStatus.OK).json({
            success: true,
            code: responseStatus.OK,
            message: messages.dataFound,
            data: data
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

exports.genereateNewKey = async (req, res) => {
    try {
        await uploadFile(req, res);

        id = req.params.id;
        data = req.decrypted.payload;
        datas = JSON.parse(JSON.stringify(req.body));
        files = req.files;

        updateToken = {
            appToken: await myFunction.randomString(64),
        }

        const updated = await model.gAccess.update(updateToken, {
            where: {
                id: id
            },
        });

        if (updated) {
            return res.status(responseStatus.OK).json({
                success: true,
                code: responseStatus.OK,
                message: messages.generateNewKey,
            });
        } else {
            return res.status(responseStatus.OK).json({
                success: false,
                code: responseStatus.OK,
                message: messages.generateNewKeyFail,
            });
        }



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

exports.createNewKey = async (req, res) => {
    try {
        await uploadFile(req, res);

        id = req.params.id;
        data = req.decrypted.payload;
        datas = JSON.parse(JSON.stringify(req.body));
        files = req.files;

        createKey = {
            id: uuidv5(await myFunction.randomString(10), config.nameSpace),
            appToken: await myFunction.randomString(64),
            status: 1,
            appName: datas.appName,
        }

        const [apiKey, created] = await model.gAccess.findOrCreate({
            where: {
                appName: {
                    [Op.eq]: datas.appName.toLowerCase()
                }
            },
            defaults: createKey,
        }).catch(err => {
            return res.status(responseStatus.badRequest).json({
                success: false,
                code: responseStatus.badRequest,
                message: err.message,
            });
        })

        if (created) {

            logMiddleware.insertLog(`${req.decrypted.payload.adminName} telah menambahkan api key baru dengan nama ${datas.appName}`, req.decrypted.payload.adminId)

            return res.status(responseStatus.OK).json({
                success: true,
                code: responseStatus.OK,
                message: messages.generateNewKey,
            });
        } else {
            return res.status(responseStatus.OK).json({
                success: false,
                code: responseStatus.OK,
                message: messages.generateNewKeyFail,
            });
        }



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

exports.enabledKey = async (req, res) => {
    try {
        await uploadFile(req, res);

        id = req.params.id;
        data = req.decrypted.payload;
        datas = JSON.parse(JSON.stringify(req.body));
        files = req.files;

        updateToken = {
            status: 1
        }

        const updated = await model.gAccess.update(updateToken, {
            where: {
                id: id
            },
        });

        if (updated) {
            return res.status(responseStatus.OK).json({
                success: true,
                code: responseStatus.OK,
                message: messages.enabledKey,
            });
        } else {
            return res.status(responseStatus.OK).json({
                success: false,
                code: responseStatus.OK,
                message: messages.generateNewKeyFail,
            });
        }



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

exports.disabledKey = async (req, res) => {
    try {
        await uploadFile(req, res);

        id = req.params.id;
        data = req.decrypted.payload;
        datas = JSON.parse(JSON.stringify(req.body));
        files = req.files;

        updateToken = {
            status: 0
        }

        const updated = await model.gAccess.update(updateToken, {
            where: {
                id: id
            },
        });

        if (updated) {
            return res.status(responseStatus.OK).json({
                success: true,
                code: responseStatus.OK,
                message: messages.disabledKey,
            });
        } else {
            return res.status(responseStatus.OK).json({
                success: false,
                code: responseStatus.OK,
                message: messages.generateNewKeyFail,
            });
        }



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

exports.deleteKey = async (req, res) => {
    try {
        await uploadFile(req, res);

        id = req.params.id;
        data = req.decrypted.payload;
        datas = JSON.parse(JSON.stringify(req.body));
        files = req.files;

        deleted = await model.gAccess.destroy({
            where: {
                id: id
            }
        })

        if (deleted) {
            return res.status(responseStatus.OK).json({
                success: true,
                code: responseStatus.OK,
                message: messages.deletedKey,
            });
        } else {
            return res.status(responseStatus.OK).json({
                success: false,
                code: responseStatus.OK,
                message: messages.generateNewKeyFail,
            });
        }



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