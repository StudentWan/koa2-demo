/**
 * @author {benyuwan@gmail.com}
 * @file 讀取請求的靜態資源目錄內容
 */
const url = require('url')
const fs = require('fs')
const path = require('path')

const walk = require('./walk')

/**
 * 封裝目錄內容
 * @param url 當前請求上下文中的url，即ctx.url
 * @param reqPath 請求靜態資源的完整本地路徑
 * @returns html 返回目錄內容，封裝成HTML
 */
function dir(url, reqPath) {
   const contentList = walk(reqPath)
   let html = `<ul>`
   for (let item of contentList) {
       html = `${html}<li><a href="${url === '/' ? '' : url}/${item}">${item}</a>`
   }
   html = `${html}</ul>`
   return html
}

module.exports = dir