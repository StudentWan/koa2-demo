/**
 * @author {benyuwan@gmail.com}
 * @file koa2异步上传文件demo的入口文件
 */
const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const koaStatic = require('koa-static')
const {uploadFile} = require('./util/upload')

const app = new Koa()

// 配置模板引擎
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

// 设置静态资源保存目录
const staticPath = './static'
app.use(koaStatic(path.join(__dirname, staticPath)))

app.use(async ctx => {
    if (ctx.method === 'GET') {
        const title = 'upload pic async'
        await ctx.render('index', {
            title
        })
    }
    else if (ctx.url === '/api/picture/upload.json' && ctx.method === 'POST') {
        const serverFilePath = path.join(__dirname, 'static/image')
        const result = await uploadFile(ctx, {
            fileType: 'album',
            path: serverFilePath
        })
        ctx.body = result
    }
    else {
        ctx.body = '<h1>404囧</h1>'
    }
})

app.listen(3000, () => console.log('[demo] upload-sync running at port 3000'))
