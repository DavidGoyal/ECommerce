const express=require("express")
const app=express();

if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"})
}

const productRouter=require("./routes/productRoute")
const userRouter=require("./routes/userRoute")
const orderRouter=require("./routes/orderRoute")
const paymentRouter=require("./routes/paymentRoute")
const midddleware=require("./middleware/error")
const cookieParser=require("cookie-parser")
const bodyParser=require("body-parser")
const fileUpload=require("express-fileupload")
const path=require("path")

app.use(express.json({limit:'50mb'}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}))
app.use(fileUpload())


app.use("/api/v1",productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1",orderRouter);
app.use("/api/v1",paymentRouter)
app.use(midddleware);


app.use(express.static(path.join(__dirname,"../Frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend/dist/index.html"))
})


module.exports=app;