import ProductRoutes from "./Routes/ProductRoutes.js";
import UserRoutes from "./Routes/UserRoutes.js";
import connectDB from "../config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import errorHandler from "./middleware/errormiddleware.js";
import express from "express";
import notFound from "./middleware/notfounderror.js";

dotenv.config();

const port=process.env.PORT || 5000;
connectDB();
const app=express();


app.use(express.json())

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//cookie parser middleware
app.use(cookieParser());


app.get("/", (req, res)=>{
    res.send("Api is running")
})

app.use("/api/products", ProductRoutes);
app.use("/api/users", UserRoutes)
app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})