const express = require("express");
const route = express.Router();

const tokenAccessMiddleware = require("../../../middleware/tokenAccess.middleware");
const jwtDecodeMiddleware = require("../../../middleware/jwt.middleware");
const modeMiddleware = require("../../../middleware/prod.middleware");

const authController = require("../../../controller/web/admin/auth.controller");
const menuController = require("../../../controller/web/admin/menu.controller");
const apiController = require("../../../controller/web/admin/api.controller");
const websiteController = require("../../../controller/web/admin/website.controller");

route.post(
    "/login",
    modeMiddleware.checkMode,
    tokenAccessMiddleware.checkHeaderToken,
    authController.authLogin,
);

route.get(
    "/profile",
    modeMiddleware.checkMode,
    tokenAccessMiddleware.checkHeaderToken,
    jwtDecodeMiddleware.jwtDecode,
    authController.getAdminProfile
);

//MENU
route.get("/menu",
    modeMiddleware.checkMode,
    tokenAccessMiddleware.checkHeaderToken,
    jwtDecodeMiddleware.jwtDecode,
    menuController.showMenu
)

//WEBSITE
route.get("/webProfile",
    modeMiddleware.checkMode,
    tokenAccessMiddleware.checkHeaderToken,
    websiteController.getWebDetail
)

//API
route.get("/settings/api-key",
    modeMiddleware.checkMode,
    tokenAccessMiddleware.checkHeaderToken,
    jwtDecodeMiddleware.jwtDecode,
    apiController.showApiKey
)

route.put("/api-key/generate/:id",
    modeMiddleware.checkMode,
    tokenAccessMiddleware.checkHeaderToken,
    jwtDecodeMiddleware.jwtDecode,
    apiController.genereateNewKey
)

route.put("/api-key/enabled/:id",
    modeMiddleware.checkMode,
    tokenAccessMiddleware.checkHeaderToken,
    jwtDecodeMiddleware.jwtDecode,
    apiController.enabledKey
)

route.put("/api-key/disabled/:id",
    modeMiddleware.checkMode,
    tokenAccessMiddleware.checkHeaderToken,
    jwtDecodeMiddleware.jwtDecode,
    apiController.disabledKey
)

route.delete("/api-key/delete/:id",
    modeMiddleware.checkMode,
    tokenAccessMiddleware.checkHeaderToken,
    jwtDecodeMiddleware.jwtDecode,
    apiController.deleteKey
)

route.post("/api-key",
    modeMiddleware.checkMode,
    tokenAccessMiddleware.checkHeaderToken,
    jwtDecodeMiddleware.jwtDecode,
    apiController.createNewKey
)


module.exports = route;