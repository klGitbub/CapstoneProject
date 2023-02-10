// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const {SERVER_PORT} = process.env
// const { getPlannedTrips, postPlannedTrip, getPlannedSights, postPlannedSight} = require('./controller.js')

// const app = express()

// app.use(express.json())

// app.listen(4000, () => console.log('server running on 4000'))

// app.use(cors())

// app.get('/postplannedtrips', getPlannedTrips)
// app.post('/postplannedtrip', postPlannedTrip)
// app.get('/getplannedsights', getPlannedSights)
// app.post('/postplannedsight', postPlannedSight)


// app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {
    //getAllClients,
    //getPendingAppointments,
    getPlannedTrips,
    postPlannedTrip,
    //getPastAppointments, 
    savePlannedTrip, 
    //completeAppointment, 
    //deleteAppointment
} = require('./controller.js')

app.use(express.json())
app.use(cors())

// USERS
//app.get('/clients', getAllClients)

// APPOINTMENTS
//app.get('/pending', getPendingAppointments)
app.get('/getplannedtrips', getPlannedTrips)
//app.get('/appt', getPastAppointments)
app.post('/postplannedtrip', postPlannedTrip)
//app.put('/saveplannedtrip', savePlannedTrip)
//app.put('/complete', completeAppointment)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))