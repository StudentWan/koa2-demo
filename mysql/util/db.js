/**
 * @author {benyuwan@gmail.com}
 * @file 封装操作数据库的模块
 */
const mysql = require('mysql')

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'koa_demo'
})

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            }
            else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

module.exports = {
    query
}
