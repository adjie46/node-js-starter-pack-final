const myFunction = require("../helper/myFunction");
const config = require("../config/config");

exports.getMenu = async (req, res, next) => {

    await myFunction.API_SERVICE(`menu`, 'get', null, req.session.tokenLogin)
        .then(response => {
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                menu: response.menu,
            });
        })
        .catch(response => {
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                menu: []
            });
        })

}