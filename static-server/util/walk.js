/**
 * @author {benyuwan@gmail.com}
 * @file 遍歷目錄內容
 */
const fs = require('fs')
const mimes = require('./mimes')

/**
 * 遍歷讀取目錄內容（子目錄，文件名）
 * @param reqPath 請求資源的絕對路徑
 * @returns {Array.<*>} 目錄內容列表
 */
function walk(reqPath) {
    const files = fs.readdirSync(reqPath)
    let dirList = []
    let fileList = []
    for (let i = 0, len = files.length; i < len; i++) {
        const item = files[i]
        const itemArr = item.split('\.')
        const itemMime = itemArr.length > 1 ? itemArr[itemArr.length - 1] : undefined

        if (!mimes[itemMime]) {
            dirList.push(files[i])
        }
        else {
            fileList.push(files[i])
        }
    }

    const result = dirList.concat(fileList)
    return result
}

module.exports = walk
