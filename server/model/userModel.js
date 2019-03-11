const mongoose = require('mongoose')

let Schema = mongoose.Schema
const userSchema = new Schema({
  username: String,
  password: String,
  token: String,
  create_time: Date
})

const User = mongoose.model('Users', userSchema)

module.exports = User
