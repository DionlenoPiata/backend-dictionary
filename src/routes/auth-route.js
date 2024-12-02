"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth-controller");

router.post("/auth/signup", controller.post);
router.post("/auth/signin", controller.authenticate);

module.exports = router;
