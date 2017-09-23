/**
 * @author {benyuwan@gmail.com}
 * @file 遍历sql文件的脚本
 */
const fs = require('fs')

const walkFile = (pathResolve, mime) => {
    const files = fs.readdirSync(pathResolve)
    const fileList = {}

    for (let item of files) {
        const itemArr = item.split('\.')
        const itemMime = (itemArr.length > 1) ? itemArr[itemArr.length - 1] : undefined
        if (mime === itemMime) {
            fileList[item] = pathResolve + item
        }
    }

    return fileList
}

module.exports = walkFile
