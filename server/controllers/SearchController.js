const db = require('../database');

const getPopular = (req, res) => {
    db.getRandom((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).end();
            return;
        }
        console.log(data);
        res.json(data);
    });
}

const getSearchResults = (req, res) => {
    let query = req.body.query || req.query.query;
    if (!query || query === "") {
        res.json([]);
        return;
    }
    db.getSearchResult(query, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).end();
            return;
        }
        res.json(data);
    });
}

module.exports = {getPopular, getSearchResults};