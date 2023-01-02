//IMPORT LIBRARY
const config = require("./app/config/config");
const helper = require("./app/helper/const");
const myFunction = require("./app/helper/myFunction");
const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");

const backendRoutes = require(__dirname + "/app/routes/web/admin/index.routes");
const mobileRoutes = require(__dirname + "/app/routes/mobile/index.routes");

//INITIALIZE EXPRESS
const app = express();


//BODYPARSER CONFIG
app.use(
    bodyParser.json({
        limit: config.limitBody,
    })
);
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: config.limitBody,
    })
);

//END BODYPARSER CONFIG


//CORS CONFIG
var whitelists = config.whitelist
const corsOptions = (req, callback) => {
    if (whitelists.indexOf(req.header('host')) !== -1) {
        callback(null, true)
    } else {
        callback(new Error(helper.notAllowedCors))
    }
}

app.use(
    cors(corsOptions)
);
//END CORS CONFIG

//Handle Error
app.use(function (err, req, res, next) {
    if (err.code == helper.badCsrfToken) {
        res.status(401);
        res.redirect("/401");
    } else if (err.message == helper.notAllowedCors) {
        return res.status(401).json({
            success: false,
            message: helper.dontHaveAccess,
            status: 401,
        });
    }
});
//END HANDLE ERROR CONFIG

//ROUTER CONFIG
app.use("/api/v1/backend", backendRoutes);
app.use("/api/v1/mobile", mobileRoutes);
//END ROUTER CONFIG

app.use(
    "/assets",
    express.static(__dirname + "/public", {
        etag: false,
    })
);

//START SERVER CONFIG
const startServer = http.createServer(app).listen(config.port);

if (startServer) {
    console.log(`${helper.messageRunServer} ${config.port}`);
}
//END SERVER CONFIG