var path = require("path"),
    mongoose = require("mongoose"),
    Schema = mongoose.Schema;


var dataSchemas = new Schema({
       id: {
        type: "Number",
        required: true,
        unique: true
    },
    city: {
        type: "String",
        required: true
    },
    start_date: {
        type: "Date",
        required: true,
        format:"yyyy-MM-dd"
    },
    end_date: {
        type: "Date",
        required: true,
        format:"yyyy-MM-dd"
    },
    price:{
        type: "String",
        required: true
    },
    status:{
        type: "String",
        required: true
    },
    color:{
        type: "String",
        required: true
    },
},{ toObject: { versionKey: true }});

module.exports = dataSchemas;