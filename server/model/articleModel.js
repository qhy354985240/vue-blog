const mongoose = require('mongoose')

let Schema = mongoose.Schema
const articleSchema = new Schema({
  articleType: Array,
  articleContent: String,
  articleAuthor: String,
  articleTitle: String,
  articleGrade: String,
  createTime: String,
  articleOwner: String,
  articleValue: String
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
