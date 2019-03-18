const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect("mongodb://localhost:27017/JWTauth");

mongoose.Promise = global.Promise;

var userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
        
    },
    password : String
});


userSchema.pre('save', function(next) {
    var user = this;
    
    return bcrypt.hash(user.password, 1).then(function(hash) {
        user.password = hash;
        
    });
     
});

userSchema.methods.isValidPassword = async function(password){
    const user = this;

    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }

module.exports = mongoose.model("Users", userSchema);