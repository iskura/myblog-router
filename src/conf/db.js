//环境参数
const env =process.env.NODE_ENV

//配置
let MYSQL_CONF
if (env==='dev') {
    MYSQL_CONF={
        host:'localhost',
        user:'MyBlog',
        password:'ZAESbLekWYHR4zLT',
        port:3306,
        database:'myblog',
        charset:'UTF8MB4_GENERAL_CI'
    }
}

if (env==='test') {
    MYSQL_CONF={
        host:'localhost',
        user:'root',
        password:'root',
        port:3306,
        database:'myblog',
        charset:'UTF8MB4_GENERAL_CI'
    }
}

if (env==='production') {
    MYSQL_CONF={
        host:'localhost',
        user:'MyBlog',
        password:'ZAESbLekWYHR4zLT',
        port:3306,
        database:'myblog',
        charset:'UTF8MB4_GENERAL_CI'
    }
}

module.exports={
    MYSQL_CONF
}