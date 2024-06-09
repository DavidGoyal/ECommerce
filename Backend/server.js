const app=require("./app")
const connectDB=require("./config/database")
const cloudinary=require("cloudinary")

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err}`);
    console.log("Shutting down the server due to uncaught exception");

    process.exit(1)
})




if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"})
}

connectDB();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})


//Handling Unhandled Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err}`);
    console.log("Shutting down the server due to unhandled promise rejections");

    server.close(()=>{
        process.exit(1)
    })
})