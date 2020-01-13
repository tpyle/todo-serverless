const mongoclient = require("mongodb").MongoClient;

const mongoConfig = {
    serverUrl: "mongodb://localhost:27017/",
    database: "todo"
};

let _connection = undefined;
let _db = undefined;

let connectDb = async () => {
    if ( !_connection ) {
        _connection = await mongoclient.connect(mongoConfig.serverUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        _db = await _connection.db(mongoConfig.database);
    }
    return _db;
}

module.exports = connectDb;