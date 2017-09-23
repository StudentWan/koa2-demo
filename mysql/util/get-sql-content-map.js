/**
 * @author {benyuwan@gmail.com}
 * @file 获取sql脚本文件内容
 * */
const fs = require('fs')
const walkFile = require('./walk-file')

const sqlContentMap = {}

/**
 * 读取sql文件内容
 * @param fileName 文件名称
 * @param path 文件所在路径
 */

const getSqlContent = (fileName, path) => {
    const content = fs.readFileSync(path, 'binary')
    sqlContentMap[fileName] = content
}

/**
 * 封装读取所有sql文件内容的脚本
 * @returns {{}} 多个文件内容组成的对象
 */

const getSqlContentMap = () => {
    let basePath = __dirname.replace(/\\/g, '\/')
    let pathArr = basePath.split('\/')
    pathArr = pathArr.splice(0, pathArr.length - 1)
    basePath = pathArr.join('/') + '/sql/'
    const sqlMap = walkFile(basePath, 'sql')
    for (let key in sqlMap) {
        if (sqlMap.hasOwnProperty(key)) {
            getSqlContent(key, sqlMap[key])
        }
    }

    return sqlContentMap
}

module.exports = getSqlContentMap
