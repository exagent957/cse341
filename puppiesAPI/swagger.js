/*eslint-disable*/
const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'Puppies API',
    description: 'CSE341 Web Services Project 2, Marc Williamson. A collection of AKC registered Labrador puppies and their litters from JW Farm, Hartselle, AL'
  },
  host: 'puppies-api-ek0y.onrender.com',
  schemes: ['https']
  // host: 'localhost:8080',
  // schemes: ['http']
}
const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

// creates swagger.json
swaggerAutogen(outputFile, endpointsFile, doc);

// run server after swagger.json in generated
// swaggerAutogen(outputFile, endpointsFile, doc).then(async () =>{
// await import('./index.js');
//});