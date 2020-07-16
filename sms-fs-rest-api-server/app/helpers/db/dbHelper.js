var path = require("path"),
    mongoose = require("mongoose"),
    autoIncrement = require('mongoose-auto-increment'),
    systemConfig = require(path.resolve("config/systemConfig"));


var dbHelper = function () { }

dbHelper.prototype.createConnection = function (callback) {
    mongoose.connection.once('open', function () {
        mongoose.connection.on('connected', function () {
            console.log('MongoDB event connected');
        });

        mongoose.connection.on('disconnected', function () {
            console.log('MongoDB event disconnected');
        });

        mongoose.connection.on('reconnected', function () {
            console.log('MongoDB event reconnected');
        });

        mongoose.connection.on('error', function (err) {
            console.log('MongoDB event error: ' + err);
        });
    });

    mongoose.connect(systemConfig.db.connectionString, { useNewUrlParser: true })
        .then(() => {
            callback(null, true)
        })
        .catch(error => {
            console.error(error.message);
            process.exit(-1);
        });
    autoIncrement.initialize(mongoose.connection);

}

dbHelper.prototype.getConnectionState = function () {
    return mongoose.connection.readyState;
}

dbHelper.prototype.getConnectionObject = function () {
    return mongoose.connection;
}

dbHelper.prototype.closeConnection = function () {
    mongoose.connection.close();
}

dbHelper.prototype.isCollectionExist = function (collectionName, callback) {
    mongoose.connection.db.listCollections({ name: collectionName })
        .next(function (err, collinfo) {
            if (collinfo) {
                callback(true)
            }
            else {
                callback(false)
            }
        });
}

module.exports = dbHelper;