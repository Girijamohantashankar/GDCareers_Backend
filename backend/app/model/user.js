const mongoose = require("mongoose");
const user = new mongoose.Schema
({
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },  
    password: {
      type: String,
      minlength: 8,
    },
    username:{
        type:String,
        required:true,
    }

});
module.exports = mongoose.model("User", user)