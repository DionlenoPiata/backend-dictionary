"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth-controller");

router.post("/signup", controller.post);
router.post("/signin", controller.authenticate);

module.exports = router;
