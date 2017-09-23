/**
 * @author {benyuwan@gmail.com}
 * @file koa2使用jsonp提供跨域数据接口的demo
 */
const Koa = require('koa')

const app = new Koa()

app.use(async ctx => {
    if (ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp') {
        const callbackName = ctx.query.callback || 'callback'
        const returnData = {
            success: true,
            data: {
                text: 'this is a jsonp api',
                time: new Date().getTime()
            }
        }

        const jsonStr = `;${callbackName}(${JSON.stringify(returnData)})}`

        ctx.type = 'text/javascript'
        ctx.body = jsonStr
    }
    else {
        ctx.body = 'hello jsonp'
    }
})

app.listen(3000, () => console.log('[demo] jsonp running at port 3000'))
