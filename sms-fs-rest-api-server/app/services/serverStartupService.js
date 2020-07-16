let path = require('path'),
dbHelperClass = require(path.resolve("app/helpers/db/dbHelper")),
dbHelper = new dbHelperClass();


var serverStartupServiceClass = function () { }

serverStartupServiceClass.prototype.init = function (callback) {
        createDBConnection( function (err,responseObject) {
                 return callback(err,responseObject);
    });
}

function createDBConnection(callback) {
    dbHelper.createConnection(function (err,value) {
        if (err) { 
            console.log(err);
            return callback(err);
        } else {
           return callback(null,{ isSuccess: true });
        }
    });
}

module.exports = serverStartupServiceClass;