const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/morsy');

const db = mongoose.connection;

db.once('open', () => { console.log("Db is connected."); }); 

module.exports = db;