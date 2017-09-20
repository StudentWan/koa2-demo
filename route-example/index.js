/**
 * @author {benyuwan@gmail.com}
 * @file koa2原生路由示例
 */
const Koa = require('koa')
const fs = require('fs')

const app = new Koa()

/**
 *
 * @param page html文件名稱
 * @returns {Promise}
 */
function render(page) {
    return new Promise((resolve, reject) => {
        const viewUrl = `./view/${page}`
        fs.readFile(viewUrl, 'binary', (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

/**
 *
 * @param url 請求的url
 * @returns {Promise.<*>} 獲取的HTML文件內容
 */
async function route(url) {
    let view = '404.html'
    switch (url) {
        case '/':
            view = 'index.html'
            break
        case '/index':
            view = 'index.html'
            break
        case '/todo':
            view = 'todo.html'
            break
        default:
            break
    }
    const html = await render(view)
    return html
}

app.use(async ctx => {
    const url = ctx.request.url
    const html = await route(url)
    ctx.body = html
})

app.listen(3000, () => console.log('[demo] raw route running at port 3000'))