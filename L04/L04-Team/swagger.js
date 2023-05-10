const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'My API',
    description: 'Temple API L04'
  },
  host: 'localhost:8080',
  schemes: ['http']
}
const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

// creates swagger.json
swaggerAutogen(outputFile, endpointsFile, doc);

// run server after swagger.json in generated
// swaggerAutogen(outputFile, endpointsFile, doc).then(async () =>{
// await import('./index.js');
//});