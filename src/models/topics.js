const mongoose = require('mongoose');
const {Schema}= mongoose;

const TopicSchema = new Schema({
    username:{type: String, required:true},
    title: {type:String, required:true},
    description: {type:String, required:true},
    date: {type:String, required:true}
    
})

module.exports = mongoose.model('Topic', TopicSchema);
