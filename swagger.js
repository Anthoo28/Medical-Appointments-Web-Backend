// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Medical Appointments API",
    description: "API documentation",
  },
  host: "localhost:8080",
  schemes: ['http']
};

const outputFile = './swagger-output.json'; // Asegúrate de que la ruta y el nombre son correctos
const endpointsFiles = ['./app.js','./models/server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app'); // Aquí carga `app.js` para iniciar el servidor después de generar swagger_output.json
});
