"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/entrie-controller");
const authService = require("../services/auth-service");

router.get("/en", authService.authorize, controller.get);
// router.get("/en/:word", controller.getByWord);
// router.post("/en/:word/favorite", controller.favorite);
// router.delete("/en/:word/unfavorite", controller.unfavorite);

module.exports = router;
