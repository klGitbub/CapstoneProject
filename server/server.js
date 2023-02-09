require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env
const { getPlannedTrips, postPlannedTrip, getPlannedSights, postPlannedSight} = require('./controller.js')

const app = express()

app.use(express.json())

app.listen(4000, () => console.log('server running on 4000'))

app.use(cors())

app.get('/plannedtrips', getPlannedTrips)
app.post('/plannedtrip', postPlannedTrip)
app.get('/plannedsights', getPlannedSights)
app.post('/plannedsight', postPlannedSight)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))