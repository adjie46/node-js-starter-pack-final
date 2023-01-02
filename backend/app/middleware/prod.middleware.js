const config = require("../config/config")
const responseStatus = require("../helper/responseStatus");
const messages = require("../helper/messages");
const myFunction = require("../helper/myFunction");

exports.checkMode = async (req, res, next) => {

    if (config.mode == "Maintenance") {
        return res.status(responseStatus.forbidden).json({
            success: false,
            code: responseStatus.forbidden,
            message: messages.Maintenance,
        });
    } else {
        next();
    }

}