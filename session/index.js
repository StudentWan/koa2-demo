/**
 * @author {benyuwan@gmail.com}
 * @file koa2操作session的demo
 */
const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

const app = new Koa()

// 设定session存放的数据库的信息
const store = new MysqlSession({
    user: 'root',
    password: 'root',
    database: 'koa_demo',
    host: '127.0.0.1',
    port: 8889
})

// 初始化cookie
const cookie = {
    maxAge: '',
    expires: '',
    path: '',
    domain: '',
    httpOnly: '',
    overwrite: '',
    secure: '',
    sameSite: '',
    signed: ''
}

// 表示使用相应的数据库存放session，并将SESSION_ID存放到cookie中
app.use(session({
    key: 'SESSION_ID',
    store: store,
    cookie: cookie
}))

app.use(async ctx => {
    if (ctx.url === '/set') {
        ctx.session = {
            userId: Math.random().toString(36).substr(2),
            count: 0
        }
        ctx.body = ctx.session
    }
    else if (ctx.url === '/') {
        ctx.session.count = ctx.session.count + 1
        ctx.body = ctx.session
    }
})

app.listen(3000, () => console.log('[demo] session demo running at port 3000'))