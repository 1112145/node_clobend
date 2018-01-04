const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./src/endpoint');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'docs')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./docs/index.html'))
})

app.use('/api', api)


app.listen(process.env.PORT, (req, res) => {
    console.log('API started at ' + process.env.PORT)
})