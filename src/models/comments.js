const mongoose = require('mongoose');
const {Schema}= mongoose;

const CommentSchema = new Schema({
    username: {type: String, required: true},
    topic: {type:String ,required:true},
    description: {type:String, required:true},
    date: {type:String, required:true}
    
})

module.exports = mongoose.model('Comment', CommentSchema);
