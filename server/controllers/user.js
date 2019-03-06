const sleep = async (ms) => {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove(true)
    })
  }, ms)
}
module.exports = {
  login (ctx) {
    ctx.body = {
      username: ctx.request.body.username
    }
  },
  async profile (ctx) {
    await sleep(1000)
    ctx.body = {
      username: '学长',
      sex: 'man',
      age: '27'
    }
  }
}
