const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :logger'))

//data
let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

//fetching the total data
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// fetching infopage
app.get('/api/info', (request, response) => {
    response.send(`phonebook has info for ${persons.length} people 
    </br> 
    <p> ${new Date()}</p>`
    )
})

//fetching individual data
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

//deleting individual data
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.filter(person => person.id !== id)

    if (person) {
        response.json(person)
    } else {
        response.status(204).end()
    }
})

//adding individual data
app.post('/api/persons/', (request, response) => {
    const newContact = request.body
    const duplicate = persons.find(person => person.name === newContact.name)

    const newId = () => {
        const personLength = persons.length > 0
            ? Math.max(...persons.map(p => p.id))
            : 0
        return personLength + 1
    }

    if (!newContact.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!newContact.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    } else if (duplicate) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        id: newId(),
        name: newContact.name,
        number: newContact.number,
    }

    // morgan.token('logger',function(req, res){
    //     const tok = JSON.stringify(req.body)
    //     return tok
    // })

    persons = persons.concat(newPerson)
    response.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})