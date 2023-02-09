require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env
const { getPlannedTrips, postPlannedTrips, getPlannedSights, postPlannedSights} = require('./controller.js')

const app = express()

app.use(express.json())

app.listen(4000, () => console.log('server running on 4000'))

app.use(cors())

app.get('/trip', getPlannedTrips)
app.put('/trip', postPlannedTrips)
app.get('/sight', getPlannedSights)
app.put('/sight', postPlannedSights)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))