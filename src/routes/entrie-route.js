"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/entrie-controller");
const authService = require("../services/auth-service");

router.get("/en", authService.authorize, controller.get);
router.get("/en/:word", authService.authorize, controller.getByWord);
router.post("/en/:word/favorite", authService.authorize, controller.favorite);
router.delete(
  "/en/:word/unfavorite",
  authService.authorize,
  controller.unfavorite
);

module.exports = router;
