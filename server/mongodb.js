const mongoose = require('mongoose')
const User = require('./model/userModel.js')
const Article = require('./model/articleModel.js')

// mongoose.connect('mongodb://qhy:qhy@localhost:27017/test?authSource=admin', {useNewUrlParser: true, config: { autoIndex: false }})
mongoose.connect('mongodb://qhy:qhy@148.70.242.234:27017/test?authSource=admin', {useNewUrlParser: true, config: { autoIndex: false }})
// mongoose.connect('mongodb://user:pass@localhost:port/database', { config: { autoIndex: false } });  //真心推荐
// 查询速度过慢则使用上面一种方法
const db = mongoose.connection

mongoose.Promise = global.Promise

db.on('error', console.error.bind(console, '数据库连接失败!'))
db.on('open', () => {
  console.log('数据库连接成功')
})

module.exports = {
  User: User,
  Article: Article
}

// const userSchema = new Schema({
//   title: String,
//   author: String,
//   body: String,
//   comments: [{body: String, date: Date}],
//   date: {type: Date, default: Date.now},
//   hidden: Boolean
// })

// mongodb数据库连接指令
// mongod --dpath=/User/didi/vue-blog/data --port=27018
