var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    systemConfig = require(path.resolve("config/systemConfig")),
    serverStartupServiceClass = require(path.resolve("app/services/serverStartupService")),
    serverStartupService = new serverStartupServiceClass(),
    dbHelperClass = require(path.resolve("app/helpers/db/dbHelper")),
    dbHelper = new dbHelperClass(),
    dataDBHelperClass = require(path.resolve("app/helpers/db/dataDBHelper")),
    dataDBHelper = new dataDBHelperClass(),
    data = require(path.resolve("mockData/data"));
    var cors = require('cors');
    app.use(bodyParser.json());
    //enables cors
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));
require(path.resolve("app/routes/routes"))(app);

var createApplicationServer = function (err, result) {
    if (err) {
        console.log("Error in initialization");
    }
    dbHelper.isCollectionExist("datas", function (isExist) {
        if(!isExist){
            dataDBHelper.restoreDBData(data,function(value){
                if(value)
                console.log("error in data restoring");
                else
                console.log("Restored Data in collection");
            });
        }
        else
        console.log("Already data collection exist");
    });
    const server = app.listen(systemConfig.smsAPI.port, function () {
        console.log("Information: REST Server running at " + systemConfig.smsAPI.ip + ":" + systemConfig.smsAPI.port);
    });
    server.timeout = 600000;
};
serverStartupService.init(createApplicationServer);