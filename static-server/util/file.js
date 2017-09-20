/**
 * @author {benyuwan@gmail.com}
 * @file 讀取靜態資源文件內容
 */
const fs = require('fs')

/**
 * 讀取文件
 * @param filePath 文件本地的絕對路徑
 * @returns {*} 文件內容
 */
function file(filePath) {
    const content = fs.readFileSync(filePath, 'binary')
    return content
}

module.exports = file