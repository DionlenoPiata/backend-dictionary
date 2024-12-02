"use strict";

const axios = require("axios");
const dao = require("../dao/entrie-dao");
const historyDao = require("../dao/history-dao");
const favoriteDao = require("../dao/favorite-dao");
const { fetchDataCache } = require("../utils/fetchDataCache");

exports.get = async (req, res, next) => {
  try {
    // #swagger.tags = ['Entrie']
    // #swagger.description = 'Endpoint para obter entries'
    let { search, page = 1, limit } = req.query;
    let { result, totalDocs, totalPages } = await dao.get(search, page, limit);

    /*  #swagger.responses[200] = {
                description: "Retornar a lista de palavras do dicionário, com paginação e suporte a busca.",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/launcheResponse"
                        }
                    }           
                }
            }   
        */

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

exports.getByWord = async (req, res, next) => {
  try {
    let { word } = req.params;
    let wordAux = await dao.findBy(1, { word }, true);

    if (wordAux) {
      const data = await fetchDataCache(
        word,
        () => fetchExternalData(word),
        process.env.CACHE_TTL
      );

      await historyDao.create({
        user: req.body.user.id,
        entrie: wordAux._id,
      });

      res.status(200).send({
        result: data,
      });
    } else {
      res.status(400).send({
        message: "Palavra não encontrada!",
      });
    }
  } catch (e) {
    console.log("error: ", e);
    res.status(500).send({ message: "Falha ao processar a requisição!" });
  }
};

exports.favorite = async (req, res, next) => {
  try {
    let { word } = req.params;
    let wordAux = await dao.findBy(1, { word }, true);

    if (wordAux) {
      let isFavorited = await favoriteDao.findBy(
        1,
        { user: req.body.user.id, entrie: wordAux._id },
        true
      );

      if (!isFavorited) {
        await favoriteDao.create({
          user: req.body.user.id,
          entrie: wordAux._id,
        });
      }

      res.status(200).send({
        message: "Palavra adicionada aos favoritos com sucesso!",
      });
    } else {
      res.status(400).send({
        message: "Palavra não encontrada!",
      });
    }
  } catch (e) {
    console.log("error: ", e);
    res.status(500).send({ message: "Falha ao processar a requisição!" });
  }
};

exports.unfavorite = async (req, res, next) => {
  try {
    let { word } = req.params;
    let wordAux = await dao.findBy(1, { word }, true);

    if (wordAux) {
      let isFavorited = await favoriteDao.findBy(
        1,
        { user: req.body.user.id, entrie: wordAux._id },
        true
      );

      if (isFavorited) {
        await favoriteDao.delete(isFavorited._id);
      }

      res.status(200).send({
        message: "Palavra retirada dos favoritos com sucesso!",
      });
    } else {
      res.status(400).send({
        message: "Palavra não encontrada!",
      });
    }
  } catch (e) {
    console.log("error: ", e);
    res.status(500).send({ message: "Falha ao processar a requisição!" });
  }
};

const fetchExternalData = async (word) => {
  let config = {
    method: "get",
    url: `${process.env.URL_API_DICTIONARY}${word}`,
  };

  const { data } = await axios.request(config);
  return data;
};
