var path = require("path"),
    mongoose = require("mongoose"),
    dataSchemas = require(path.resolve("app/dbSchemas/dataSchemas"));

var dataDBHelperClass = function () {
    this.schema = dataSchemas;
    this.model = mongoose.model("data", this.schema);
}

dataDBHelperClass.prototype.restoreDBData = function (data, callback) {
    this.model.insertMany(data, function (err) {
        if (err) {
            callback(err);
        } else {
            callback();
        }
    });
}

dataDBHelperClass.prototype.getDBDataBetweenDate = function (data, callback) {
    try {
        this.model.aggregate([
            {
                $match: {
                    $or: [{ start_date: { "$gte": new Date(data.start_date), "$lte": new Date(data.end_date) } },
                    { end_date: {"$gte": new Date(data.start_date), "$lte": new Date(data.end_date) } }]
                }
            },
            {
                $addFields: {
                    start_date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$start_date" }
                    },
                    end_date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$end_date" }
                    }
                }
            }], function (err, data) {
                if (err) {
                    callback(err, data);
                } else {
                    callback(err, data);
                }
            }).sort({ id: 1 });

    } catch (error) {
        callback(error, null);
    }

}

dataDBHelperClass.prototype.createOrUpdateDBData = function (data, callback) {
    console.log(data)
    this.model.findOneAndUpdate(
        { "id": data.id },
        data,
        { upsert: true, new: true, setDefaultsOnInsert: true}
        , function (err, value) {
            if (err) {
                callback(err, value);
            } else {
                callback(err, value);
            }
        });
}

dataDBHelperClass.prototype.deleteOneDBData = function (data, callback) {
    this.model.findOneAndDelete(
        { "id": data.id }
        , function (err) {
                callback(err);
        });
}

dataDBHelperClass.prototype.getAllDBData = function (callback) {
    try {
        this.model.aggregate([
            {
                $match: {
                }
            },
            {
                $addFields: {
                    start_date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$start_date" }
                    },
                    end_date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$end_date" }
                    }
                }
            }], function (err, data) {
                if (err) {
                    callback(err, data);
                } else {
                    callback(err, data);
                }
            }).sort({ id: 1 });
        
    } catch (error) {
        callback(error, null);
    }

}

module.exports = dataDBHelperClass;