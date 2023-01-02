const express = require("express");
const route = express.Router();

const multer = require('multer');
const upload = multer();

const authMiddleware = require("../middleware/auth.middleware");
const authController = require("../controller/auth.controller");
const dashboardController = require("../controller/dashboard.controller");
const errorController = require("../controller/error.controller");
const menuController = require("../controller/menu.controller");
const apiController = require("../controller/api.controller");

//LOGIN
route.get("/", authMiddleware.mode, authMiddleware.auth, authController.authPage);
route.get("/login", authMiddleware.mode, authMiddleware.auth, authController.authPage);
route.post("/login", upload.any(), authController.authLogin);
route.post("/logout", authController.authLogout);

//MENU
route.get("/menu", authMiddleware.mode, authMiddleware.unauth, menuController.getMenu);

//API
route.get("/settings/api", authMiddleware.mode, authMiddleware.unauth, apiController.getData);
route.put("/settings/api/generate/:id", authMiddleware.mode, authMiddleware.unauth, apiController.updateKey);
route.put("/settings/api/disabled/:id", authMiddleware.mode, authMiddleware.unauth, apiController.disabledKey);
route.put("/settings/api/enabled/:id", authMiddleware.mode, authMiddleware.unauth, apiController.enabledKey);
route.delete("/settings/api/delete/:id", authMiddleware.mode, authMiddleware.unauth, apiController.deleteKey);
route.post("/settings/api", authMiddleware.mode, authMiddleware.unauth, apiController.createNewToken);

//DASHBOARD
route.get("/dashboard", authMiddleware.mode, authMiddleware.unauth, dashboardController.dashboardPage);

//ERROR
route.get("/404", authMiddleware.mode, errorController.notFoundPage)
route.get("*", authMiddleware.mode, errorController.notFoundPage)

module.exports = route;