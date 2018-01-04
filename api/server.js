const express = require('express');
const bodyParser = require('body-parser');

const api = require('./src/endpoint');

const app = express();

app.use(bodyParser.json());

app.use('/api', api)


app.listen(process.env.PORT, (req, res) => {
    console.log('API started at ' + process.env.PORT)
})