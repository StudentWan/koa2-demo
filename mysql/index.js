/**
 * @author {benyuwan@gmail.com}
 * @file koa2封装数据库初始化建表demo的入口文件
 */
const getSqlContentMap = require('./util/get-sql-content-map')
const query = require('./util/db').query

const eventLog = (err, sqlFile, index) => {
    if (err) {
        console.log(`[ERROR] sql脚本文件：${sqlFile} 第${index + 1}条脚本 执行失败！`)
    }
    else {
        console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功`)
    }
}

const sqlContentMap = getSqlContentMap()

const createAllTables = async () => {
    for (let key in sqlContentMap) {
        if (sqlContentMap.hasOwnProperty(key)) {
            const sqlShell = sqlContentMap[key]
            const sqlShellList = sqlShell.split(';')

            for (let [i, shell] of sqlShellList.entries()) {
                if (shell.trim()) {
                    const result = await query(shell)
                    if (result.serverStatus * 1 === 2) {
                        eventLog(null, key, i)
                    }
                    else {
                        eventLog(true, key, i)
                    }
                }
            }
        }
    }
}

createAllTables()
