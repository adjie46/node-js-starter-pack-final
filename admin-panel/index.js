const config = require("./app/config/config")
const helper = require("./app/helper/const");
const bodyParser = require("body-parser");

const express = require("express");
const cors = require("cors");
const http = require("http");
var csrf = require("csurf");


const hbs = require("hbs");
const hbsutils = require("hbs-utils")(hbs);
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

const routes = require("./app/routes/routes");

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

app.use(
    "/assets",
    express.static(__dirname + "/public", {
        etag: false,
    })
);

hbs.registerPartials(__dirname + "/app/view/includes/");
hbs.registerPartials(__dirname + "/app/view/pages/");
hbsutils.registerWatchedPartials(__dirname + "/app/view/includes/");
hbsutils.registerWatchedPartials(__dirname + "/app/view/pages/");
hbsutils.precompilePartials();
app.set("views", path.join(__dirname, "app/view/"));
app.disable("views cache");
app.set("view engine", "hbs");

hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper("ifNotEquals", function (arg1, arg2, options) {
    return arg1 != arg2 ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper("ifAnd", function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

hbs.registerHelper("inc", function (value, options) {
    return parseInt(value) + 1;
});

hbs.registerHelper("log", function (content) {
    console.log(content.fn(this));
    return "";
});

app.use(
    session({
        cookie: {
            maxAge: Date.now() + 1000 * 60 * 60 * 24,
        },
        secret: config.jwtSecret,
        resave: true,
        saveUninitialized: false,
    })
);

app.use(cookieParser());

var csrfProtection = csrf({
    cookie: true
});

app.use("/", csrfProtection, routes);

app.use(function (err, req, res, next) {
    if (err.code == "EBADCSRFTOKEN") {
        return res.status(401).json({
            success: false,
            message: "TOKEN TIDAK VALID! <br> HUBUNGI PROGRAMMER",
            status: 401,
        });
    } else if (err.message == "Not allowed by CORS") {
        return res.status(401).json({
            success: false,
            message: "Anda Tidak Mempunyai Akses",
            status: 401,
        });
    }

    // handle CSRF token errors here
});

//START SERVER CONFIG
const startServer = http.createServer(app).listen(config.port);

if (startServer) {
    console.log(`${helper.messageRunServer} ${config.port}`);
}