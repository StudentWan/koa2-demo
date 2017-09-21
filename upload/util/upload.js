/**
 * @author {benyuwan@gmail.com}
 * @file koa2上传文件时处理上传文件流的模块
 */
const inspect = require('util').inspect
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')

/**
 * 同步创建文件目录
 * @param dirname 目录的绝对地址
 * @returns {boolean} 创建目录的结果
 */
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true
    }
    if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname)
        return true
    }
}

/**
 * 获取上传文件的后缀名
 * @param fileName 上传的文件名
 * @returns {*} 文件的后缀名
 */
function getSuffixName(fileName) {
    const nameList = fileName.split('.')
    return nameList[nameList.length -1]
}

function uploadFile(ctx, options) {
    const req = ctx.req
    const res = ctx.res
    const busboy = new Busboy({headers: req.headers})

    const fileType = options.fileType || 'common'
    const filePath = path.join(options.path, fileType)
    const mkdirResult = mkdirsSync(filePath)

    return new Promise((resolve, reject) => {
        console.log('文件上传中...')
        const result = {
            success: false,
            formData: {}
        }

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const uploadFileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            const saveTo = path.join(filePath, uploadFileName)

            file.pipe(fs.createWriteStream(saveTo))

            file.on('end', () => {
                result.success = true
                result.message = '文件上传成功'
                console.log('文件上传成功')
            })
        })

        busboy.on('field', (fieldname, val, fielnameTruncated, valTruncated, encoding, mimetype) => {
            console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val))
            result.formData[fieldname] = inspect(val)
        })

        busboy.on('finish', () => {
            console.log('文件上传结束')
            resolve(result)
        })

        busboy.on('error', (err) => {
            console.log('文件上传出错')
            reject(result)
        })

        req.pipe(busboy)
    })

}

module.exports = {
    uploadFile
}
