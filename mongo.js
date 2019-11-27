const mongoose = require('mongoose');

if ( process.argv.length<3 ) {
    console.log('give password as argument')
    process.exit(1)
  }
  
  //bmlLsv3fHOouDWhK
  const password = process.argv[2]
  
  const url ="mongodb+srv://MOD:monkey123@phonebookbackend-3ovwl.mongodb.net/test?retryWrites=true&w=majority";
    //`mongodb+srv://MOD:${password}@phonebookbackend-3ovwl.mongodb.net/test?retryWrites=true&w=majority`
console.log(url)

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  
  const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
  })
  
  const Note = mongoose.model('Note', noteSchema)
  
  const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
  })
  
  note.save().then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  