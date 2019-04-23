const moment = require('moment')

const Article = require('../mongodb.js').Article

// 数据库操作

// 查找所有文章分页查询
const findAllArticle = (size, current, filter) => {
  console.log(filter, 'find')
  return new Promise((resolve, reject) => {
    Article.find(filter, null, {sort: [{_id: -1}]}, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    }).limit(size).skip(--current * size)
  })
}

// 查询总的条数
const findTotal = (filter) => {
  return new Promise((resolve, reject) => {
    Article.countDocuments(filter, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
// 删除某个用户
const deleteArticle = (_id) => {
  return new Promise((resolve, reject) => {
    Article.findOneAndDelete({_id: _id}, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}
// 删除多个用户
const deleteArticles = (selection) => {
  return new Promise((resolve, reject) => {
    Article.remove({_id: {$in: selection}}, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}
// 更新用户数据
const update = (where, data) => {
  return new Promise((resolve, reject) => {
    Article.update(where, data, (err, user) => {
      if (err) {
        reject(err)
      }
      resolve(user)
    })
  })
}

const submitArticle = async (ctx) => {
  let article = new Article({
    articleType: ctx.request.body.articleType,
    articleContent: ctx.request.body.articleContent,
    articleAuthor: ctx.request.body.articleAuthor,
    articleOwner: ctx.request.body.articleOwner,
    articleTitle: ctx.request.body.articleTitle,
    articleGrade: ctx.request.body.articleGrade,
    createTime: moment().format('YYYY-MM-DD HH:mm'),
    articleValue: ctx.request.body.articleValue
  })
  let doc = await new Promise((resolve, reject) => {
    article.save((err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
  if (doc) {
    ctx.status = 200
    ctx.body = {
      success: true
    }
  } else {
    ctx.status = 200
    ctx.body = {
      success: false
    }
  }
}

// 获得文章列表
const getArticle = async (ctx) => {
  console.log('xzxzxz')
  let size = ctx.request.body.pageSize
  let current = ctx.request.body.pageCurrent
  let filter = ctx.request.body.filter
  let doc = []
  let total = 0
  let result = []
  let reg = new RegExp(filter.articleTitle, 'i')
  filter.articleTitle = reg
  Object.keys(filter).map(item => {
    if (filter[item] === '' || filter[item].length === 0 || !filter[item]) {
      delete filter[item]
    }
  })
  if (filter.articleType && filter.articleType.length !== 0) {
    filter.articleType = {$all: filter.articleType}
  }

  await Promise.all([findAllArticle(size, current, filter), findTotal(filter)]).then(results => {
    doc = results[0]
    total = results[1]
    if (doc.length > 0) {
      doc.map(item => {
        result.push({
          articleTitle: item.articleTitle,
          articleContent: item.articleContent,
          createTime: item.createTime,
          articleAuthor: item.articleAuthor,
          articleGrade: item.articleGrade,
          articleType: item.articleType,
          articleOwner: item.articleOwner,
          _id: item._id,
          articleValue: item.articleValue
        })
      })
    }
  }).catch(err => {
    console.log(err)
  })
  ctx.status = 200
  ctx.body = {
    success: true,
    result: result,
    total: total
  }
}

// 删除文章 单个
const delArticle = async (ctx) => {
  let _id = ctx.request.body._id
  let doc = await deleteArticle(_id)
  if (doc) {
    ctx.body = {
      success: true,
      info: '删除成功'
    }
  } else {
    ctx.body = {
      success: false,
      info: '删除失败'
    }
  }
}

// 删除文章 多个
const delArticles = async (ctx) => {
  let selection = ctx.request.body.selection
  let doc = await deleteArticles(selection)
  if (doc) {
    ctx.body = {
      success: true,
      info: '删除成功'
    }
  } else {
    ctx.body = {
      success: false,
      info: '删除失败'
    }
  }
}

module.exports = {
  submitArticle,
  getArticle,
  delArticle,
  delArticles
}
