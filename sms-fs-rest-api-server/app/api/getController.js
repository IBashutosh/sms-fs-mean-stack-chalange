const { isNumber } = require("util");

let path = require("path"),
dataDBHelperClass = require(path.resolve("app/helpers/db/dataDBHelper")),
dataDBHelper = new dataDBHelperClass();

let getControllerClass = function () { }

getControllerClass.prototype.getData = function (req, res) {
    try {
        let requestBody = req.query;
        let promise = new Promise(function (resolve, reject) {
            dataDBHelper.getDBDataBetweenDate(requestBody,function (err,data) {
                if(!err){
                    resolve(data);
                }
                 reject(err);
            });
        });

        promise.then(function (value) {
            res.send(value);
            return;
        });
    } catch (e) {
        res.send(e);
        return;
    }
}

getControllerClass.prototype.getAllData = function (req, res) {
    try {
        let requestBody = req.body;
        let promise = new Promise(function (resolve, reject) {
            dataDBHelper.getAllDBData(function (err,data) {
                if(!err){
                    resolve(data);
                }
                 reject(err);
            });
        });

        promise.then(function (value) {
            res.send(value);
            return;
        });
    } catch (e) {
        res.send(e);
        return;
    }
}

getControllerClass.prototype.updateData = function (req, res) {
    try {
        let requestBody = req.body;
        console.log(requestBody);
        let promise = new Promise(function (resolve, reject) {
            if(!Number(req.body.id)){
                console.log("invalida");
                return reject("invalid id");  
            }
            dataDBHelper.createOrUpdateDBData(requestBody,function (err,data) {
                if(!err){
                   return resolve(data);
                }
                 return reject(err);
            });
        });

        promise.then(function (value) {
            res.send(value);
            return;
        });
    } catch (e) {
        console.log(e)
        res.send(e);
        return;
    }
}

getControllerClass.prototype.deletedData = function (req, res) {
    try {
        let requestBody = req.params;
        let promise = new Promise(function (resolve, reject) {
            dataDBHelper.deleteOneDBData(requestBody,function (err) {
                  return resolve(err);
            });
        });

        promise.then(function (value) {
            res.send(value);
            return;
        });
    } catch (e) {
        res.send(e);
        return;
    }
}
module.exports = getControllerClass;