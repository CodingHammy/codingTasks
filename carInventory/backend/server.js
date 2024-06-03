const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const carRoutes = require('./routes/carRoutes')

dotenv.config()
const app = express()

//create express app
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
}

mongoose
  .connect(MONGODB_URI, clientOptions)
  .then(() => {
    console.log('Connected to Mongoose')
  })
  .catch((error) => {
    console.error('Error connecting to the db', error)
  })

app.use('/api/cars', carRoutes)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

module.exports = app
