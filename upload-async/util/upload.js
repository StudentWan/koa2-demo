/**
 * @author {benyuwan@gmail.com}
 * @file 服务端处理文件上传
 */
const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

/**
 * 同步创建文件目录
 * @param dirname 目录绝对地址
 * @returns {boolean} 创建目录结果
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
 * 获取文件后缀名
 * @param fileName 文件名
 * @returns {*} 文件后缀名
 */

function getSuffixName(fileName) {
    const nameList = fileName.split('.')
    return nameList[nameList.length - 1]
}

function uploadFile(ctx, options) {
    const req = ctx.req
    const busboy = new Busboy({headers: req.headers})

    const fileType = options.fileType || 'common'
    const filePath = path.join(options.path, fileType)
    mkdirsSync(filePath)

    return new Promise((resolve, reject) => {
        console.log('文件上传中...')
        const result = {
            success: false,
            message: '',
            data: null
        }

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            const saveTo = path.join(filePath, fileName)

            file.pipe(fs.createWriteStream(saveTo))

            file.on('end', () => {
                result.success = true
                result.message = '文件上传成功'
                result.data = {
                    pictureUrl: `//${ctx.host}/image/${fileType}/${fileName}`
                }
                console.log('文件上传成功！')
            })
        })

        busboy.on('finish', () => {
            console.log('文件上传结束')
            resolve(result)
        })

        busboy.on('error', () => {
            console.log('文件上传出错')
            reject(result)
        })

        req.pipe(busboy)
    })
}

module.exports = {
    uploadFile
}

