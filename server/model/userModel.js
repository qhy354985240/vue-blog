const mongoose = require('mongoose')

let Schema = mongoose.Schema
const userSchema = new Schema({
  userName: String,
  passWord: String,
  nickName: String,
  email: String,
  createTime: String,
  token: String,
  userType: String,
  create_time: Date
})

const User = mongoose.model('Users', userSchema)

module.exports = User
