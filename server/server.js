const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const SearchController = require('./controllers/SearchController');
const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/popular', SearchController.getPopular);

app.post('/search', SearchController.getSearchResults);


app.listen(8080, () => console.log("Server is running on port: 8080"));