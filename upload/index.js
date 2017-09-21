/**
 * @author {benyuwan@gmail.com}
 * @file koa2文件上传demo的入口文件
 */
const Koa = require('koa')
const path = require('path')

const {uploadFile} = require('./util/upload')

const app = new Koa()

app.use(async ctx => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        const html = `
            <h1>koa2 upload demo</h1>
            <form method="POST" action="/upload.json" enctype="multipart/form-data">
                <p>file upload</p>
                <span>picName:</span><input name="picName" type="text" /><br/>
                <input name="file" type="file" /><br/><br/>
                <button type="submit">submit</button>
            </form>
        `
        ctx.body = html
    }
    else if (ctx.url === '/upload.json' && ctx.method === 'POST') {
        const serverFilePath = path.join(__dirname, 'upload-files')
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

app.listen(3000, () => console.log('[demo] upload-simple running at port 3000'))
