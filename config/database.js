const sqlite3 = require('sqlite3').verbose()
    // var md5 = require('md5')

const DBSOURCE = "./SQLite/alunos.db"

let database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = database;