const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
require('dotenv/config')

// Variables
const app = express();
const port = 3000;


// defining a schema for our events
const eventSchema = new mongoose.Schema({
  name: { type: String, require: true },
  
})



//middleware using json
app.use(express.json())

//middleware using morgan
app.use(morgan('dev'))

// Start the express server
app.listen(port, () => {
  console.log(`Server running at ${port}`)
});

// Database
const events = [
  // { id: 1, type: 'music', location: 'Royal Festival Hall', name: 'Mahler’s Resurrection' },
  // { id: 2, type: 'sport', location: 'Tower Bridge', name: 'London Half Marathon' },
  // { id: 3, type: 'film', location: 'Rio Cinema', name: 'Barbie' }
  { id: 1, type: 'music', location: 'O2', name: 'Linkin Park' },
  { id: 2, type: 'sport', location: 'Madrid', name: 'Real Madrid' },
  { id: 3, type: 'film', location: 'London', name: 'Deadpool' }
]

// index route to get the events
app.get('/events', (req, res) => {
  try {
    return res.send(events)
  } catch (error) {
    console.log(error)
    return res.status(500).send('error ocurred')
  }
})


// add new event
app.post('/events', (req, res) => {
 try {
  req.body.id = events.length + 1
  events.push(req.body)
  return res.send(req.body)
 } catch (error) {
  console.log(error)
  return res.status(500).send('An error occurred');
 }
})


// * -- Show
// The "show" route should display a single specific contacts object
// Route: GET /contacts/:contactId
// Body: Not required
app.get('/events/:eventId', (req, res) => {
  try {
    // Convert the url parameter to a number
    const eventId= Number(req.params.eventId)

    // Find the contact in the array by its id
    const foundEvent = events.find(event => {
      return event.id === eventId
    })

    // If we find it we return it
    if (foundEvent) {
      return res.send(foundEvent)
// ------
    // If we don't find it, we send a 404 response 
    } else {
      return res.status(404).send('Event not found')
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send('An error occurred')
  }
})

// * -- Update
// The "update" route should update a single specific contacts object
// Route: PUT /contacts/:contactId
// Body: JSON object containing "name" and/or "email"
app.put('/events/:eventId', (req, res) => {
  try {
    const eventId = Number(req.params.eventId)
    
    const foundEvent = events.find(event => {
      return event.id === eventId
    })

    if (!foundEvent) {
      return res.status(404).send('Event not found')
    }
    
    Object.assign(foundEvent, req.body)

    return res.send(foundEvent)
  } catch (error) {
    console.log(error.message)
    return res.status(500).send('An error occurred')
  }
})

// * -- Delete
// The "delete" route should delete a single specific contacts object
// Route: DELETE /contacts/:contactId
// Body: Not required
app.delete('/events/:eventId', (req, res) => {
  try {
    const eventId = Number(req.params.eventId)
    const foundIndex = events.findIndex(event => {
      return event.id === eventId
    })
    events.splice(foundIndex, 1)
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(500).send('An error occurred')
  }
})


// ! -- 404 Handlers
app.get('*', (req, res) => {
  return res.status(404).send('<h1>Page not found!</h1>')
})

app.use((req, res) => {
  return res.status(404).send('Resource not found')
})

// ! -- Server Connections

// * -- Establish MongoDB connection

// Start the Express server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})