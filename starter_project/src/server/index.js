var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your API key is ${process.env.API_KEY}`);

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

console.log(__dirname);

// Variables for url and api key


app.get('/', function (req, res) {
    // res.sendFile('dist/index.html');
    res.send("This is the server API page, you may access its services via the client app.");
});


// POST Route



// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


