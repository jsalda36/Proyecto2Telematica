const mongoose = require('mongoose');
//const URI = 'mongodb://db:27017/octopus';
const URI = "mongodb+srv://jsalda36:febMKO_24@basedatos-b1f2e.mongodb.net/test?retryWrites=true&w=majority";
//const URI = 'mongodb://localhost/octopus';
mongoose.connect(URI,{useNewUrlParser: true})
    .then(db => console.log("db conected"))
    .catch(err => console.error(err));

module.exports = mongoose;