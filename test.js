const mongoose = require('mongoose');

const url ="mongodb+srv://MOD:monkey123@phonebookbackend-3ovwl.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect( url, {useNewUrlParser: true , useUnifiedTopology: true}).then(
    success =>{ console.log(success)},
    err =>{ console.log(err)}

)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("works!")
  // we're connected!
});
