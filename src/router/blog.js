const { getList,getDetail,newBlog,updateBlog,delBlog} =require('../controller/blog')
const {ErrorModel, SuccessModel}=require('../model/resModel')
const handleBlogRouter=(req,res)=>{
    const method=req.method
    const id=req.query.id
    //获取博客列表
    if(method==='GET' && req.path==='/api/blog/list'){
        const author=req.query.author || ''
        const keyword=req.query.keyword || ''  

        const result=getList(author,keyword)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })
    }
    // 获取博客详情
    if(method==='GET' && req.path==='/api/blog/detail'){
        const result = getDetail(id)
        return result.then(detailData=>{
            return new SuccessModel(detailData)
        })
    }
    //  新建一篇博客
    if(method==='POST' && req.path==='/api/blog/new'){  
        // const data=newBlog(req.body)
        // return new SuccessModel(data)
        req.body.author="炸炸鱼"        //假数据
        const result = newBlog(req.body)
        return result.then(newData=>{
            return new SuccessModel(newData)
        })
    }
    // 更新一篇博客
    if(method==='POST' && req.path==='/api/blog/update'){
        const result=updateBlog(id,req.body)
        return result.then(val=>{
            if(val){
                return new SuccessModel(result)
            }else{
                return new ErrorModel("更新博客失败")
            }
        })
        
        
    }
    // 删除一篇博客
    if(method==='POST' && req.path==='/api/blog/del'){
        const author='炸炸鱼'//假数据
        const result=delBlog(id,author)
        return result.then(delDate=>{
            if(delDate){
                return new SuccessModel(delDate)
            }else{
                return new ErrorModel("删除博客失败")
            }
        })
        
    }
}
module.exports=handleBlogRouter