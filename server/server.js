const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const SearchController = require('./controllers/SearchController');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/popular', SearchController.getPopular);

app.post('/search', SearchController.getSearchResults);


app.listen(8081, () => console.log("Service is running on port: 8081"));