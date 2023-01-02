const config = require("../config/config")
var axios = require("axios");

async function API_SERVICE(url, method, data, token) {
    return new Promise(async (resolve, reject) => {
        try {
            var configs = {
                method: `${method}`,
                url: `${config.baseUrl}${url}`,
                headers: {
                    'x-api-key': config.apiKey,
                    'Authorization': `Bearer ${token}`,
                },
                data: data
            };

            axios(configs)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    if (error.code == "ECONNREFUSED") {
                        reject(error)
                    } else if (error.code == "ERR_BAD_REQUEST") {
                        reject(error)
                    } else if (error.code == "ECONNRESET") {
                        reject(error)
                    } else {
                        reject(error.response.data)
                    }
                });

        } catch (error) {
            reject(error)
        }
    })
}

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
}

module.exports = {
    API_SERVICE,
    isEmpty
}