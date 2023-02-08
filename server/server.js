require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')

const app = express()

app.use(express.json())

app.listen(4000, () => console.log('server running on 4000'))

app.use(cors())

app.post('/seed', seed)
