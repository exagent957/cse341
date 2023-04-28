const express = require('express');
const bodyParser = require('body-parser');
const professionalRoutes = require('./routes/professional');
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/professional', professionalRoutes);
app.listen(port, () =>{
  console.log(`Server is now running on port ${port}`);
});