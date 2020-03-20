const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/etsysearch', {useNewUrlParser: true, useUnifiedTopology: true});

const searchResultSchema = new Schema({
    _id: Number,
    itemName: String,
    searchableName: String, //lowercase version of itemname
  });

const SearchResult = mongoose.model('SearchResult', searchResultSchema);


const getRandom = async (callback) => {
  try {
    const results = await SearchResult.aggregate([{ $sample: {size: 6} }]).exec();
    callback(null, results.map((doc) => ({id: doc._id, name: doc.itemName})));
  }catch(e) {
    callback(e);
  }
}

const getSearchResult = async (query, callback) => {
    try {
      const results = await SearchResult.find({searchableName: {$regex: `^${query.toLowerCase()}`}}).limit(11).exec();
      callback(null, results.map((doc) => ({id: doc._id, name: doc.itemName})))
    }catch(e) {
      callback(e);
    }
}

module.exports = {getSearchResult, getRandom};



// TEST DATA IMPORTER

const testData = require("../../exampledata.json");
const IMPORT_TEST_DATA = false;

const importTestData = async () => {
  await SearchResult.deleteMany({}).exec();
  for (entry of testData) {
    let id = entry._id;
    let searchRequest = new SearchResult();
    searchRequest._id = entry._id;
    searchRequest.itemName = entry.itemName;
    searchRequest.searchableName = entry.itemName.toLowerCase();
    searchRequest.save(() => {
      console.log(`Saved: ${id}`);
    });
  }
}

//change this to import the test data
if (IMPORT_TEST_DATA) {
  importTestData();
}