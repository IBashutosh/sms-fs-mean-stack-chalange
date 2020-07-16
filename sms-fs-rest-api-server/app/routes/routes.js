var path = require("path"),
  systemConfig = require(path.resolve("config/systemConfig")),
  getControllerClass = require(path.resolve("app/api/getController"));


module.exports = function (app) {
    let getController = new getControllerClass();
    app.get([systemConfig.smsAPI.path + "/data"], getController.getData);
    app.get([systemConfig.smsAPI.path + "/allData"], getController.getAllData);
    app.put([systemConfig.smsAPI.path + "/data"], getController.updateData);
    app.delete([systemConfig.smsAPI.path + "/data/:id"], getController.deletedData);
    
}