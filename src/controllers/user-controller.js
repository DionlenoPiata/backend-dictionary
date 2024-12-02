"use strict";

const dao = require("../dao/user-dao");
const entrieDao = require("../dao/entrie-dao");
const historyDao = require("../dao/history-dao");
const favoriteDao = require("../dao/favorite-dao");

exports.getProfile = async (req, res, next) => {
  try {
    let { id, name, email } = req.body.user;
    res.status(200).send({
      id,
      name,
      email,
    });
  } catch (e) {
    console.log("error: ", e);
    res.status(500).send({ message: "Falha ao processar a requisição!" });
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    let { id } = req.body.user;

    let { page = 1, limit } = req.query;
    let { result, totalDocs, totalPages } = await historyDao.getByUser(
      id,
      page,
      limit
    );

    res.status(200).send({
      result,
      totalDocs,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    });
  } catch (e) {
    console.log("error: ", e);
    res.status(500).send({ message: "Falha ao processar a requisição!" });
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    let { id } = req.body.user;

    let { page = 1, limit } = req.query;
    let { result, totalDocs, totalPages } = await favoriteDao.getByUser(
      id,
      page,
      limit
    );

    res.status(200).send({
      result,
      totalDocs,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    });
  } catch (e) {
    console.log("error: ", e);
    res.status(500).send({ message: "Falha ao processar a requisição!" });
  }
};
