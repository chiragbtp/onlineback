const mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid/v1')

var userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname:{
        type: String,
        required: true,
        maxlength:32,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    userinfo: {
        type: String,
        trim: true
    },

    encry_password:{
        type: String,
        required: true
    },

    salt: String,

    role:{
        type: Number,
        default: 0     // 0 for user
    },

    purchases:{
        type: Array,
        default: []
    }
},{timestamps:true});

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePass(password);
    })
    .get(function(){
        return this._password;
    })


//convert into encrypt password
userSchema.methods = {
    auntheticate:  function(plainpassword){
        return this.securePass(plainpassword) === this.encry_password;
    },

    securePass: function(plainpassword){
        if(!plainpassword) return "";
        try {
            return crypto.createHmac('sha256',this.salt)
            .update(plainpassword)
            .digest('hex')
        } catch (error) {
            return "";
        }
    }
}


module.exports =mongoose.model("User",userSchema)