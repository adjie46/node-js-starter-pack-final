const myFunction = require("../helper/myFunction");
const config = require("../config/config");
const uploadFile = require("../middleware/upload.middleware");
const messages = require("../helper/messages");
var FormData = require('form-data');

exports.getData = async (req, res, next) => {
    await myFunction.API_SERVICE(`/settings/api-key`, 'get', null, req.session.tokenLogin)
        .then(response => {
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                data: response.data
            });
        })
        .catch(response => {
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                data: []
            });
        })
}

exports.updateKey = async (req, res, next) => {
    id = req.params.id
    await myFunction.API_SERVICE(`/api-key/generate/${id}`, 'put', null, req.session.tokenLogin)
        .then(response => {
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                data: response.data
            });
        })
        .catch(response => {
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                data: []
            });
        })
}

exports.enabledKey = async (req, res, next) => {
    id = req.params.id
    await myFunction.API_SERVICE(`/api-key/enabled/${id}`, 'put', null, req.session.tokenLogin)
        .then(response => {
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                data: response.data
            });
        })
        .catch(response => {
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                data: []
            });
        })
}

exports.disabledKey = async (req, res, next) => {
    id = req.params.id
    await myFunction.API_SERVICE(`/api-key/disabled/${id}`, 'put', null, req.session.tokenLogin)
        .then(response => {
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                data: response.data
            });
        })
        .catch(response => {
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                data: []
            });
        })
}

exports.deleteKey = async (req, res, next) => {
    id = req.params.id
    await myFunction.API_SERVICE(`/api-key/delete/${id}`, 'delete', null, req.session.tokenLogin)
        .then(response => {
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                data: response.data
            });
        })
        .catch(response => {
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                data: []
            });
        })
}

exports.createNewToken = async (req, res, next) => {
    form = JSON.parse(JSON.stringify(req.body));

    try {

        await uploadFile(req, res);
        id = req.params.id;
        datas = JSON.parse(JSON.stringify(req.body));
        files = req.files;

        var form = new FormData();

        form.append('appName', datas.appName);

        await myFunction.API_SERVICE('/api-key', 'post', form, req.session.tokenLogin)
            .then(response => {
                return res.status(response.code).json({
                    success: response.success,
                    code: response.code,
                    message: response.message,
                });
            })
            .catch(response => {
                return res.status(response.code).json({
                    success: response.success,
                    code: response.code,
                    message: response.message,
                });
            })


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