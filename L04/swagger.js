/*eslint-disable*/
const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE341 Web Services L04, Marc Williamson'
  },
  host: '/l04.onrender.com/',
  schemes: ['https']
}
const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

// creates swagger.json
swaggerAutogen(outputFile, endpointsFile, doc);

// run server after swagger.json in generated
// swaggerAutogen(outputFile, endpointsFile, doc).then(async () =>{
// await import('./index.js');
//});