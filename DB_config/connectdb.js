const mongoose = require("mongoose");
require("dotenv").config()

const mongo_url = process.env.MONGODB_URI

const connectdb = ()=>{
    mongoose.connect(mongo_url)
}

module.exports = connectdb;