// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://127.0.0.1:27017/test' , 
    //  'mongodb://localhost:27017/test' , 
    { useNewUrlParser: true }, 
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connect Success");
});