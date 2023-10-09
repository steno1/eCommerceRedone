import dotenv from "dotenv"
import express from "express";
import products from "../data/products.js";

dotenv.config();

const port=process.env.PORT || 5000;
const app=express();
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("Api is running")
})
// All products
app.get("/api/products", (req, res)=>{
    res.json(products)
})
//Single Product
app.get("/api/products/:id", (req, res)=>{
    const product=products.find((x)=>x._id===req.params.id);
    res.json(product)
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})