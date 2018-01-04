const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const verifyToken = require('./src/middleware/verifyToken');
const api = require('./src/endpoint');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'docs')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './docs/index.html'));
})

app.use('/api', api);

app.get('/test', verifyToken, (req, res) => {
    res.send('aaaa');
})


app.listen(process.env.PORT || 5000, (req, res) => {
    console.log('API started at ' + process.env.PORT)
})