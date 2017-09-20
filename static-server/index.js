/**
 * @author {benyuwan@gmail.com}
 * @file koa2原生搭建靜態服務器的demo
 */
const Koa = require('koa')
const path = require('path')
const content = require('./util/content')
const mimes = require('./util/mimes')

const app = new Koa()

const staticPath = './static'

/**
 * 解析資源類型
 * @param url 請求的地址
 * @return TBD
 */
function parseMime(url) {
    let extName = path.extname(url)
    extName = extName ? extName.slice(1) : 'unknown'
    return mimes[extName]
}

app.use(async ctx => {
    const fullStaticPath = path.join(__dirname, staticPath)
    const _content = await content(ctx, fullStaticPath)
    const _mime = parseMime(ctx.url)

    if (_mime) {
        ctx.type = _mime
    }

    if (_mime && _mime.indexOf('image/') >= 0) {
        ctx.res.writeHead(200)
        ctx.res.write(_content, 'binary')
        ctx.res.end()
    }
    else {
        ctx.body = _content
    }
})

app.listen(3000, () => console.log('[demo] raw static-server running at port 3000'))

