"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/entrie-controller");
const authService = require("../services/auth-service");

router.get("/entries/en", authService.authorize, controller.get);
router.get("/entries/en/:word", authService.authorize, controller.getByWord);
router.post(
  "/entries/en/:word/favorite",
  authService.authorize,
  controller.favorite
);
router.delete(
  "/entries/en/:word/unfavorite",
  authService.authorize,
  controller.unfavorite
);

module.exports = router;
