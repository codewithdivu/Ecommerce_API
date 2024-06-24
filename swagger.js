import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My Api",
    version: "1.0.0",
    descryption: "My API Descryption",
    contact: {
      name: "Divyesh Mavadiya",
      url: "https://google.com",
      email: "mavadiyadivysh56@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:8888",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
