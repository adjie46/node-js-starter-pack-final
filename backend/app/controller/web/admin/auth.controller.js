const model = require("../../../database/models/index");
const responseStatus = require("../../../helper/responseStatus");
const myFunction = require("../../../helper/myFunction");
const messages = require("../../../helper/messages");
const config = require("../../../config/config");

const logMiddleware = require("../../../middleware/log.middleware");

const uploadFile = require("../../../middleware/upload.middleware");


exports.authLogin = async (req, res, next) => {
    try {
        await uploadFile(req, res);
        datas = JSON.parse(JSON.stringify(req.body));

        if (myFunction.isEmpty(datas)) {
            return res.status(responseStatus.badRequest).json({
                success: false,
                code: responseStatus.badRequest,
                message: messages.invalidFormat,
            });
        } else {
            if (myFunction.isEmpty(datas.username) || myFunction.isEmpty(datas.password)) {
                return res.status(responseStatus.badRequest).json({
                    success: false,
                    code: responseStatus.badRequest,
                    message: messages.invalidFormat,
                });
            } else {

                const dataAdmin = await model.gUser.findOne({
                    where: {
                        adminUsername: datas.username,
                    },
                    limit: 1
                });

                if (myFunction.isEmpty(dataAdmin)) {
                    return res.status(responseStatus.OK).json({
                        success: false,
                        code: responseStatus.OK,
                        message: messages.userNotFound,
                    });
                } else {

                    passDecrypt = await myFunction.decrypt(dataAdmin.adminPassword).catch(err => {
                        return res.status(responseStatus.serverError).json({
                            success: false,
                            code: responseStatus.serverError,
                            message: `${messages.error} : Gagal Mengdekripsi Data`,
                        });
                    })

                    if (passDecrypt === datas.password) {

                        const payload = {
                            adminId: dataAdmin.id,
                            adminName: dataAdmin.adminName,
                            adminRole: -1,
                        };

                        const secret = Buffer.from(config.hex, "hex")
                        const encryptedJwt = await myFunction.generateEncryptedJwt("login_action", payload, secret, config.jwtExpireWeb);

                        logMiddleware.insertLog(`${dataAdmin.adminName} telah melakukan login`, dataAdmin.id)

                        return res.status(responseStatus.OK).json({
                            success: true,
                            code: responseStatus.OK,
                            message: messages.loginSuccess,
                            token: encryptedJwt,
                        });


                    } else {
                        return res.status(responseStatus.OK).json({
                            success: false,
                            code: responseStatus.OK,
                            message: messages.wrongPassword,
                        });
                    }
                }

            }
        }
    } catch (error) {
        return res.status(responseStatus.badRequest).json({
            success: false,
            code: responseStatus.badRequest,
            message: error,
        });
    }
}

exports.getAdminProfile = async (req, res) => {
    payload = req.decrypted.payload

    dataAdmin = await model.gUser.findOne({
        attributes: ['id', 'adminName', 'adminEmail', 'adminPhone', 'adminRole'],
        where: {
            id: payload.adminId
        }
    })

    if (myFunction.isEmpty(dataAdmin)) {
        return res.status(responseStatus.OK).json({
            success: false,
            code: responseStatus.OK,
            message: messages.userNotFound,
            data: []
        });
    } else {
        return res.status(responseStatus.OK).json({
            success: true,
            code: responseStatus.OK,
            message: messages.userFound,
            data: dataAdmin
        });
    }

}