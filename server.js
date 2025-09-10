// Budget API
const budget = require('./budget-data.js');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// app.use(cors());
app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});     

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});