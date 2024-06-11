const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    from:{
        type:String
    },
    only_msg:{
        type:String
    },
    media:{
        type:String
    },
    receivedAt: { type: Date, default: Date.now }
})

const usermodel = mongoose.model("Mg_user",userschema);
module.exports = usermodel