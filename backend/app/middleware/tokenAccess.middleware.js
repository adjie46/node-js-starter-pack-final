const model = require("../database/models/index");
const responseStatus = require("../helper/responseStatus");
const messages = require("../helper/messages");
const myFunction = require("../helper/myFunction");

const {
    Op
} = require("sequelize");

exports.checkHeaderToken = async (req, res, next) => {

    let apiKey = req.headers['x-api-key'];

    if (myFunction.isEmpty(apiKey)) {
        return res.status(responseStatus.unauthorized).json({
            success: false,
            code: responseStatus.unauthorized,
            message: messages.notAuthorized,
        });
    }

    const gToken = await model.gAccess.findAll({
        where: {
            [Op.and]: [{
                    appToken: apiKey,
                },
                {
                    status: 1
                }
            ]

        },
        limit: 1
    });

    if (gToken.length <= 0) {
        return res.status(responseStatus.unauthorized).json({
            success: false,
            code: responseStatus.unauthorized,
            message: messages.notAuthorized,
        });
    } else {
        next();
    }

}