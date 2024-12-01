"use strict";

const dao = require("../dao/entrie-dao");

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
    console.log("errror: ", e);
    res.status(500).send({ message: "Falha ao processar a requisição!" });
  }
};

// exports.getByWord = async (req, res, next) => {
//   try {
//   } catch (e) {
//     console.log("errror: ", e);
//     res.status(500).send({ message: "Falha ao processar a requisição!" });
//   }
// };

// exports.favorite = async (req, res, next) => {
//   try {
//   } catch (e) {
//     console.log("errror: ", e);
//     res.status(500).send({ message: "Falha ao processar a requisição!" });
//   }
// };

// exports.unfavorite = async (req, res, next) => {
//   try {
//   } catch (e) {
//     console.log("errror: ", e);
//     res.status(500).send({ message: "Falha ao processar a requisição!" });
//   }
// };
