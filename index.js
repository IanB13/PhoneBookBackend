require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const app = express()
const cors = require('cors');
app.use(cors())
//needs this for body requests
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
//error middleware
//app.use(express.static('build'));
//need app.listen to start server, server already built in heroku
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

//Adding mongoose db backend
const Person = require('./models/person')


app.get('/info',(request,response) =>{
    Person.find({}).then(person => {
        response.send(`<div>Phonebook has info for ${person.length} people</div>
        <div> Info current as of: ${new Date} </div>`)
    })
})

//old 
/* app.get('/api/persons',(request,response) =>{
    response.json(persons)
    
}) */
// New mongofied request
app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (request, response,next) => {
    Person.findById(request.params.id).then(person => {
        if(person){
            response.json(person.toJSON())
        }else{
            response.status(404).end() 
        }
    })
    .catch(error => next(error))
})




app.post('/api/persons', (request, response) => {
    const name = request.body.name;
    const number = request.body.number;
    if (name === "") {
        return response.status(400).json({ alert: 'name missing' })
    }
    else if (number === "") {
        return response.status(400).json({ alert: 'number missing' })
    }else{    
    const person = new Person({
        name: name,
        number: number
    })
    
    person.save().then(savedNote => {
        response.json(savedNote.toJSON())
    }).catch(console.log("hello world"))
    }
})

app.delete('/api/persons/:id', (request, response, next) => {
    console.log("delete")
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

app.put('/api/persons/:id', (request,response,next) =>{
    console.log('change')
    console.log(request.body)
  
    Person.findByIdAndUpdate(request.params.id ,request.body).then(
        response.status(204).end()
    ) 
    .catch(error => next(error))
})

// old heroku api stuff
/* 
app.post('/api/persons',(request,response) =>{
    const name = request.body.name;
    const number = request.body.number;
    const id = Math.round(Math.random()*10000)
    morgan(":post-token");
    //console.log(name,number,id)
    //console.log(!!(persons.find(persons => persons.name === name)))
    if(!!(persons.find(persons => persons.name === name))){
        response.status(409).send({"error":"Duplicate Name"});
    }
    else if(!number || number === ""){
        response.status(409).send({"error":"No number sent"});
    }
    else if(!name || name === ""){
        response.status(409).send({"error":"No name sent"});
    }
    else{
        persons.push({name,number,id})
        response.status(201).end();
    }
    console.log(persons)
}) */

//gives info on all api request
morgan.token('type', function (req, res) { 
    const bodyString = JSON.stringify(req.body)
    return bodyString})

//Error handling Middleware
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// adding error middleware
app.use(errorHandler)