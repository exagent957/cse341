/*eslint-disable*/
const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'Puppies API',
    description: 'CSE341 Web Services Project 2, Marc Williamson'
  },
  //host: 'l04.onrender.com/',
  host: 'localhost:8080/',
  //schemes: ['https']
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