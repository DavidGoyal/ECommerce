const ErrorHandler=require("../utils/errorHandler");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"Internal Server Error";


    //Wrong MongoDB error
    if(err.name==="CastError"){
        const message=`Resource not found. Invalid: ${err.path}`
        err=new ErrorHandler(message,400)
    }


    //Mongoose Duplicacy error
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} entered`
        err=new ErrorHandler(message, 400)
    }

    //Wrong JWT error
    if(err.namw==="JsonWebTokenError"){
        const message=`Json Web Token is invalid, try again`
        err=new ErrorHandler(message, 400)
    }

    //JWT Expire error
    if(err.namw==="TokenExpireError"){
        const message=`Json Web Token is expired, try again`
        err=new ErrorHandler(message, 400)
    }


    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}