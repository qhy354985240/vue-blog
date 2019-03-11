const resFormat = async (ctx, next) => {
  await next()
  if (ctx.body) {
    ctx.body = {
      message: 'success',
      data: ctx.body
    }
  } else {
    ctx.body = {
      message: 'success',
      data: null
    }
  }
}

module.exports = resFormat
