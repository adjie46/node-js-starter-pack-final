const model = require("../database/models/index");
const responseStatus = require("../helper/responseStatus");
const myFunction = require("../helper/myFunction");
const messages = require("../helper/messages");
const config = require("../config/config");

exports.jwtDecode = async (req, res, next) => {

    let token = req.headers['authorization'];

    if (myFunction.isEmpty(token)) {
        return res.status(responseStatus.OK).json({
            success: false,
            code: responseStatus.unauthorized,
            message: "Anda Tidak Memiliki Akses!",
        });
    } else {
        const secret = Buffer.from(config.hex, "hex")
        await myFunction.decryptJwt(token.split(" ")[1], secret)
            .then(data => {
                req.decrypted = data
                next();
            })
            .catch(err => {
                if (err.code == "ERR_JWT_EXPIRED") {
                    return res.status(responseStatus.OK).json({
                        success: false,
                        code: responseStatus.unauthorized,
                        message: "Token Session Telah Habis, Silahkan Login Ulang",
                    });
                } else if (err.code == "ERR_JWE_DECRYPTION_FAILED") {
                    return res.status(responseStatus.OK).json({
                        success: false,
                        code: responseStatus.unauthorized,
                        message: "Token Tidak Valid!, Silahkan Login Ulang",
                    });
                } else if (err.code == "ERR_JWE_INVALID") {
                    return res.status(responseStatus.OK).json({
                        success: false,
                        code: responseStatus.unauthorized,
                        message: "PROGRAM ERROR!, HUBUNGI DEVELOPER",
                    });
                } else {
                    return res.status(responseStatus.OK).json({
                        success: false,
                        code: responseStatus.unauthorized,
                        message: err.code,
                    });
                }
            })

        /*  req.decrypted = decrypted
         next(); */

    }



}