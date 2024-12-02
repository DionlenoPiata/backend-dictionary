"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/user-controller");
const authService = require("../services/auth-service");

router.get("/user/me", authService.authorize, controller.getProfile);
router.get("/user/me/history", authService.authorize, controller.getHistory);
router.get(
  "/user/me/favorites",
  authService.authorize,
  controller.getFavorites
);

module.exports = router;
