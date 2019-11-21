const morgan = require('morgan')
const express = require('express');
const app = express()
const cors = require('cors');
app.use(cors())
//needs this for body requests
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
//need app.listen to start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//should store this elsewhere
// should not directly mutate array

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
];
  



app.get('/info',(request,response) =>{
    response.send(`<div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date} </div>`)

})

app.get('/api/persons',(request,response) =>{
    response.json(persons)

})


app.get('/api/persons/:id', (request,response) =>{
    const id = request.params.id;
    const person = persons.find(person => person.id === +id)
    if(person){
        response.json(person)
    }
    else{
        response.status(404).end();
    } 
}
)

app.delete('/api/persons/:id',(request,response) =>{
    const id = request.params.id;
    persons = persons.filter(person => person.id != id);
    response.status(204).end();

})


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
})


morgan.token('type', function (req, res) { 
    const bodyString = JSON.stringify(req.body)
    return bodyString})