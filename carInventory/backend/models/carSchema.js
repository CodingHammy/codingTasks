const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  owner: { type: String, required: true },
  registration: { type: String, required: true },
  address: { type: String, required: true },
  createAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

const Car = mongoose.model('Car', carSchema)
module.exports = Car
