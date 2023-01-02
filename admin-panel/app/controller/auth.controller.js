var FormData = require('form-data');
const myFunction = require("../helper/myFunction");
const responseStatus = require("../helper/responseStatus");
const message = require("../helper/const");

exports.authLogin = async (req, res, next) => {
    form = JSON.parse(JSON.stringify(req.body));

    var data = new FormData();

    data.append('username', form.username);
    data.append('password', form.password);

    await myFunction.API_SERVICE('login', 'post', data)
        .then(response => {

            session = req.session;
            session.tokenLogin = response.token;

            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
            });
        })
        .catch(response => {
            if (response.code == "ECONNREFUSED") {
                return res.status(responseStatus.serverError).json({
                    success: false,
                    code: responseStatus.serverError,
                    message: message.backendNotStart,
                });
            } else {
                return res.status(response.code).json({
                    success: response.success,
                    code: response.code,
                    message: response.message,
                });
            }
        })

}

exports.authLogout = async (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
}

exports.authPage = async (req, res) => {

    var webProfile;

    await myFunction.API_SERVICE(`webProfile`, 'get', null)
        .then(response => {
            webProfile = response.data[0]
        })
        .catch(response => {
            console.log(response);
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                data: []
            });
        })

    return res.render("login", {
        web: webProfile,
        csrfToken: req.csrfToken()
    });

}