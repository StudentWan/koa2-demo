/**
 * @author {benyuwan@gmail.com}
 * @file koa2利用node對象解析post請求表單數據的demo
 */
const Koa = require('koa')

const app = new Koa()

app.use(async ctx => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        const html = `
        <h1>koa2 request post demo</h1>
        <form method="POST" action="/">
            <p>userName</p>
            <input name="userName" /><br/>
            <p>nickName</p>
            <input name="nickName" /><br/>
            <p>email</p>
            <input name="email" /><br/>
            <button type="submit">submit</button>
        </form>
    `
        ctx.body = html
    }
    else if (ctx.url === '/' && ctx.method === 'POST') {
        const postData = await parsePostData(ctx)
        ctx.body = postData
    }
    else {
        ctx.body = '<h1>404囧</h1>'
    }
})

// Comment TBD
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postData = ''
            ctx.req.addListener('data', data => postData += data)
            ctx.req.addListener('end', () => {
                const parseData = parseQueryStr(postData)
                resolve(parseData)
            })
        }
        catch(err) {
            reject(err)
        }
    })
}


function parseQueryStr(queryStr) {
    let queryData = {}
    const queryStrList = queryStr.split('&')
    for ( const queryItem of queryStrList) {
        const itemList = queryItem.split('=')
        queryData[itemList[0]] = decodeURIComponent((itemList[1]))
    }
    return queryData
}

app.listen(3000, () => console.log('[demo] request post running at port 3000'))