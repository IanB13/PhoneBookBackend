const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url =`mongodb+srv://Test:Test12345@phonebookbackend-3ovwl.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    suc =>{console.log("Connection Success!") 
    // console.log(suc)
  }).catch( err =>{
      console.log("Connection Failure")
      //console.log(err)
  })

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
  const Person = mongoose.model('Person',personSchema)

