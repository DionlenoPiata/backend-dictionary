"use strict";

const jwt = require("jsonwebtoken");

exports.generateToken = async (data) => {
  return jwt.sign(data, process.env.SALT_KEY, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
};

exports.decodeToken = async (token) => {
  let data = await jwt.verify(token, process.env.SALT_KEY);
  return data;
};

exports.authorize = function (req, res, next) {
  let token =
    req.body.token ||
    req.query.token ||
    req.headers[process.env.HEADERS_NAME_TOKEN];

  if (!token) {
    res.status(401).json({
      message: "Acesso Restrito",
    });
  } else {
    jwt.verify(token, process.env.SALT_KEY, function (error, decoded) {
      if (error) {
        res.status(401).json({
          message: "Token Inválido",
        });
      } else {
        next();
      }
    });
  }
};
