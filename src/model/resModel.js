class BaseModel{
    constructor(data,message){
        if(typeof data==='string'){
            this.message=data
            data=null
            message=null
        }
        if(message){
            this.message=message
        }
        if(data){
            this.data=data
        }
    }
}
class SuccessModel extends BaseModel{
    constructor(data,message){
        super(data,message)
        this.errno=0
    }
}
class ErrorModel extends BaseModel{
    constructor(data,message){
        super(data,message)
        this.errno=-1 
    }
}
module.exports={
    ErrorModel,
    SuccessModel
}