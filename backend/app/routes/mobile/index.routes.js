const express = require("express");
const route = express.Router();

const tokenAccessMiddleware = require("../../middleware/tokenAccess.middleware");
const jwtDecodeMiddleware = require("../../middleware/jwt.middleware");
const modeMiddleware = require("../../middleware/prod.middleware");

module.exports = route;