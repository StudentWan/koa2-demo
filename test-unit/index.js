/**
 * @author {benyuwan@gmail.com}
 * @file 单元测试的demo
 */
const Koa = require('koa')

const app = new Koa()

const server = async (ctx, next) => {
    const result = {
        success: true,
        data: null
    }

    if (ctx.method === 'GET') {
        if (ctx.url === '/getString.json') {
            result.data = 'this is string data'
        }
        else if (ctx.url === '/getNumber.json') {
            result.data = 123456
        }
        else {
            result.success = false
        }
        ctx.body = result
        next && next()
    }
    else {
        ctx.body = 'hello world'
        next && next()
    }
}

app.use(server)

app.listen(3000, () => console.log('[demo] test-unit running at port 3000'))

module.exports = app

