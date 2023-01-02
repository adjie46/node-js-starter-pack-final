const model = require("../database/models/index");
const responseStatus = require("../helper/responseStatus");
const messages = require("../helper/messages");
const myFunction = require("../helper/myFunction");

const {
    v4: uuidv4
} = require('uuid');

const insertLog = async (log, idUser) => {
    newLog = {
        id: uuidv4(),
        log: log,
        idUser: idUser
    }

    await model.gLog.create(newLog)
};

module.exports = {
    insertLog
}