const myFunction = require("../helper/myFunction");
const config = require("../config/config");

exports.auth = async (req, res, next) => {
    let session = req.session;

    if (!myFunction.isEmpty(session.tokenLogin)) {
        res.status(200);
        return res.redirect("/dashboard");
    }

    next();
};

exports.unauth = async (req, res, next) => {
    let session = req.session;
    if (myFunction.isEmpty(session.tokenLogin)) {
        res.status(200);
        return res.redirect("/");
    }

    next();
};

exports.mode = async (req, res, next) => {
    if (config.mode == "Maintenance") {
        res.status(200);
        return res.redirect("/maintenance");
    }
    next();
}