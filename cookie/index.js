/**
 * @author {benyuwan@gmail.com}
 * @file koa2操作cookie的demo
 */
const Koa = require('koa')

const app = new Koa()

app.use(async ctx => {
    if (ctx.url === '/index') {
        ctx.cookies.set(
            'cid',
            'hello world',
            {
                domain: 'localhost',
                path: '/index',
                maxAge: 10 * 60 * 1000,
                expires: new Date('2018-02-15'),
                httpOnly: false,
                overwrite: false
            }
        )
        ctx.body = ctx.cookies.get('cid')
    }
    else {
        ctx.body = 'No cookie set'
    }
})

app.listen(3000, () => console.log('[demo] cookie running at port 3000'))
