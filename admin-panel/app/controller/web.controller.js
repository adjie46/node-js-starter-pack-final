const myFunction = require("../helper/myFunction");
const config = require("../config/config");
const uploadFile = require("../middleware/upload.middleware");
const messages = require("../helper/messages");
var FormData = require('form-data');

const fs = require('fs');

exports.updateWebSetting = async (req, res, next) => {
    form = JSON.parse(JSON.stringify(req.body));

    try {

        await uploadFile(req, res);
        id = req.params.id;
        datas = JSON.parse(JSON.stringify(req.body));
        files = req.files;

        var form = new FormData();
        var favicon, logo;

        if (files.length != 0) {
            files.forEach(element => {
                if (element.fieldname == "favicon") {
                    favicon = element.filename;
                    fs.copyFile(element.path, `./public/images/${element.filename}`, (err) => {
                        if (err) throw err;
                        console.log('source was copied to destination');
                    });

                    try {
                        fs.unlinkSync(element.path);

                        console.log("Delete File successfully.");
                    } catch (error) {
                        console.log(error);
                    }

                    form.append('webFavicon', `/assets/images/${favicon}`);


                } else if (element.fieldname == "logo") {
                    logo = element.filename;
                    fs.copyFile(element.path, `./public/images/${element.filename}`, (err) => {
                        if (err) throw err;
                        console.log('source was copied to destination');
                    });

                    try {
                        fs.unlinkSync(element.path);

                        console.log("Delete File successfully.");
                    } catch (error) {
                        console.log(error);
                    }

                    form.append('webLogo', `/assets/images/${logo}`);

                }
            });

            form.append('webId', datas.webId);
            form.append('webTitle', datas.title_web);
            form.append('webDescription', datas.description_website);
            form.append('webAuthor', datas.author);

        } else {
            form.append('webId', datas.webId);
            form.append('webTitle', datas.title_web);
            form.append('webDescription', datas.description_website);
            form.append('webAuthor', datas.author);
            form.append('webFavicon', datas.webFavicon);
            form.append('webLogo', datas.webLogo);
        }

        await myFunction.API_SERVICE('/webProfile/id', 'put', form, req.session.tokenLogin)
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