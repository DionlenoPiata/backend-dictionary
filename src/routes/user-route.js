"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/user-controller");
const authService = require("../services/auth-service");

router.get("/me", authService.authorize, controller.getProfile);
router.get("/me/history", authService.authorize, controller.getHistory);
router.get("/me/favorites", authService.authorize, controller.getFavorites);

module.exports = router;
