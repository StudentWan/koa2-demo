/**
 * @author {benyuwan@gmail.com}
 * @file koa2使用koa-jsonp中间件来实现给客户端的跨域数据接口
 */
const Koa = require('koa')
const jsonp = require('koa-jsonp')

const app = new Koa()

app.use(jsonp())

app.use(async ctx => {
    const returnData = {
        success: true,
        data: {
            text: 'this is a jsonp api',
            time: new Date().getTime()
        }
    }

    ctx.body = returnData
})

app.listen(3000, () => console.log('[demo] koa-jsonp running at port 3000'))
