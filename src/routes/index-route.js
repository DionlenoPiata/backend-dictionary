"use strict";

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  // #swagger.description = 'Rota inicial da aplicação.'
  /*  #swagger.responses[200] = {
               
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/indexResponse"
                        }
                    }           
                }
            }   
        */
  res.status(200).send({
    message: process.env.APP_NAME,
  });
});

module.exports = router;
