const mongoose = require('mongoose');
const {Schema}= mongoose;

const UserSchema = new Schema({
    
    username: {type:String, required:true, unique:true, trim:true, minlength:3},
    
    password: {type:String, required:true, minlength:3}
})

module.exports = User = mongoose.model("users", UserSchema);
