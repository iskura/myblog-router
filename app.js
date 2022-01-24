const handleBlogRouter = require("./src/router/blog")
const handleUserRouter = require("./src/router/user")
const querystring=require("querystring")
//用于处理postData
const getPostData=(req)=>{
    const promise= new Promise((resolve,reject)=>{
        if(req.method!=='POST'){
            resolve({})
            return
        }
        if(req.headers['content-type']!=='application/json'){
            resolve({})
            return
        }
        let postData=""
        req.on('data',chunk=>{
            postData+=chunk.toString()
        })
        req.on('end',()=>{
           if(!postData){
               resolve({})
               return
           }
           resolve(
               JSON.parse(postData)
           )
        })
    })
    return promise
}

const serverHandle = (req,res) =>{
    //设置返回格式JSON
    res.setHeader('content-type','application/json;charest=UTF8MB4_GENERAL_CI')
    // res.setHeader('content-type', 'text/plain;charset=')
    //跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    // 获取path
    const url=req.url
    req.path=url.split('?')[0]
    // 解析query
    req.query=querystring.parse(url.split('?')[1])
    //处理postdata
    getPostData(req).then(postData=>{
        req.body=postData
        // 处理blog路由
        const blogResult = handleBlogRouter(req,res)
        if (blogResult) {
            blogResult.then(blogData=>{
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        const userData=handleUserRouter(req,res)
        if(userData){
            res.end(
                JSON.stringify(userData)
            )
            return
        }
        //未命中路由，返回404
        res.writeHead(404,{"Content-type":"text/plain"})
        res.write("404 Not Found\n")
        res.end()

        })
    
}
module.exports=serverHandle

//process.env.NODE_ENV