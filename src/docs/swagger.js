const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "../docs/swagger_output.json";
const endpointsFiles = [
  "../routes/index-route.js",
  "../routes/auth-route.js",
  "../routes/user-route.js",
  "../routes/entrie-route.js",
];

const doc = {
  info: {
    version: `1.0.0`,
    title: `Fullstack Challenge 🏅 - Dictionary`,
    description:
      "API para listar palavras em inglês, utilizando como base a API Free Dictionary API.",
  },
  servers: [
    {
      url: `localhost:3000`,
    },
  ],

  components: {
    schemas: {
      indexResponse: {
        message: `1.0.0`,
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
