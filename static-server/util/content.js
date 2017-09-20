/**
 * @author {benyuwan@gmail.com}
 * @file 讀取請求內容
 */
const path = require('path')
const fs = require('fs')

const dir = require('./dir')
const file = require('./file')

/**
 * 獲取靜態資源的內容
 * @param ctx koa上下文
 * @param fullStaticPath 靜態資源目錄在本地的絕對路徑
 * @returns {Promise.<void>} 請求獲取到本地的內容
 */
async function content(ctx, fullStaticPath) {
   const reqPath = path.join(fullStaticPath, ctx.url)
   const exist = fs.existsSync(reqPath)

   let content

   if (!exist) {
       content = '404 Not Found!'
   }
   else {
       const stat = fs.statSync(reqPath)
       if (stat.isDirectory()) {
           content = dir(ctx.url, reqPath)
       } else {
           content = file(reqPath)
       }
   }

   return content
}

module.exports = content
