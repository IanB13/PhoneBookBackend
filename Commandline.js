const mongoose = require('mongoose');


// node mongo.js yourpassword Anna 040-1234556

if ( process.argv.length<3 ) {
    console.log('give password as argument')
    process.exit(1)
  }else if (process.argv.length > 5){
    console.log('to many arguments given')
    process.exit(1)
  }

  
  const url =
  `mongodb+srv://Test:${process.argv[2]}@phonebookbackend-3ovwl.mongodb.net/phonebook-app?retryWrites=true`
  
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
    
if(process.argv[3]&& process.argv[4]){
        console.log('read data')

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
 
  person.save().then(response => {
    console.log(`Added ${process.argv[3]} number: ${process.argv[4]} to phonebook!`)
    mongoose.connection.close()
  }).catch( err =>{
      console.log('Error on save')
      console.log(err)
      mongoose.connection.close()
  
  })
}else{ 
    Person.find({}).then(result => {
        console.log("Phone Book:")
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
}
