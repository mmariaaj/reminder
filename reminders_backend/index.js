const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

let reminders = {
    "reminders":[
        {
            "name": "Buy some eggs",
            "timestamp": "2021-11-10T13:00:00.141Z",
            "id": 1
        },
        {
            "name": "Make an omelette",
            "timestamp": "2021-11-11T08:00:00.141Z",
            "id": 2
        },
        {
            "name": "Wash dishes",
            "timestamp": "2021-11-11T09:00:00.000Z",
            "id": 3
        },
        {
            "name": "Buy more eggs",
            "timestamp": "2021-11-11T13:00:00.000Z",
            "id": 4
        }
    ]
}

app.get('/api/reminders', (request, response)=>{
    response.writeHead(200, {'Content-type': 'application/json'})
    response.end(JSON.stringify(reminders))
})

app.get('/api/reminders/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const reminder = reminders.reminders.find(reminder => reminder.id === id )
    response.json(reminder)
})

app.delete('/api/reminders/:id', (request, response) => {
    const id = Number(request.params.id)
    reminders = reminders.reminders.filter(reminder => reminder.id !== id)

    response.status(204).end()
})

app.post('/api/reminders/', (request, response) => {
    const body = request.body

    if(body.name === undefined || body.timestamp === undefined){
        console.log('Error')
        response.status(401).json({error: "Required info missing"})
    }
    if(reminders.reminders.some(reminder => reminder.name === body.name)){
        console.log('Reminder already exists')
        response.status(401).json({error: "Reminder already exists"})
    }

    const reminder = {
        name: body.name,
        timestamp: body.timestamp,
        id: Math.floor(Math.random() * 100000)
    }
    reminders.reminders.concat(reminder)
    console.log(reminder)
    response.json(reminder)

})
const error = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}
app.use(error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})