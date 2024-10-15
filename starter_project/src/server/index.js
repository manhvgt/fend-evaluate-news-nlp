var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
// const meaningCloud = require('meaning-cloud');

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

console.log(__dirname);

// Variables for url and api key
const API_URL = process.env.API_ID;
const API_KEY = process.env.API_KEY;

// GET Route
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
    res.send("This is the server API page, you may access its services via the client app.");
});


// POST Route
app.post('/api', async (req, res) => {
    // setup form data
    const { url } = req.body;
    const formdata = new FormData();
    formdata.append("key", API_KEY);
    // formdata.append("of", "json"); // Default is json
    // formdata.append("lang", "auto");  // 2-letter code, like en es fr ...
    formdata.append("lang", "auto");
    formdata.append("url", url);
    
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };     

      console.log('requestOptions', requestOptions);

    // try to fetch data
    try {
        const response = await fetch(API_URL, requestOptions);
        if(!response.ok) {
          console.error('Failed to call API, error', response.status);
        }
        const data = await response.json();
        res.json(data); 
        // console.log(res);
    }
    catch(e) {
      console.error('error', e);
    }
});


// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});
