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
      url: ``,
    },
  ],
  components: {
    schemas: {
      indexResponse: {
        message: `1.0.0`,
      },
      signupRequest: {
        name: "Dionleno",
        email: "email.test@email.com",
        password: "123",
      },
    },
  },
  definitions: {
    AddUser: {
      $name: "Jhon Doe",
      email: 29,
      password: "",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
