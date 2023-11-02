import ProductRoutes from "./Routes/ProductRoutes.js";
import UserRoutes from "./Routes/UserRoutes.js";
import connectDB from "../config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import errorHandler from "./middleware/errormiddleware.js";
import express from "express";
import notFound from "./middleware/notfounderror.js";
import orderRoutes from "./Routes/OrderRoutes.js";
import path from "path"
import uploadRoutes from "./Routes/uploadRoutes.js";

// Loading environment variables from a .env file into process.env
dotenv.config();

// Setting the port for the server, using process.env.PORT if available, otherwise defaulting to 5000
const port=process.env.PORT || 5000;

// Connecting to the database using the connectDB function
connectDB();

// Creating an instance of the express application
const app=express();

// Middleware for parsing JSON request bodies
app.use(express.json())

// Middleware for parsing URL-encoded request bodies with extended options
app.use(express.urlencoded({extended:true}))

// Middleware for parsing cookies in the request
app.use(cookieParser());

app.use('/api/upload', uploadRoutes)  // Use the uploadRoutes for handling file uploads

// Handling GET request to the root route and sending a response
app.get("/", (req, res)=>{
    res.send("Api is running here")
})

// Using the ProductRoutes module for requests starting with "/api/products"
app.use("/api/products", ProductRoutes);

// Using the UserRoutes module for requests starting with "/api/users"
app.use("/api/users", UserRoutes)

// Using the orderRoutes module for requests starting with "/api/orders"
app.use("/api/orders", orderRoutes)

// Handling GET request to "/api/config/paypal" and sending a response with a JSON object
app.get('/api/config/paypal', (req, res)=>
res.send({client:process.env.PAYPAL_CLIENT_ID}));

const __dirname=path.resolve();
app.use('/uploads', express.static(path.join(__dirname, "/uploads")))// Serve uploaded files

if(process.env.NODE_ENV==="production"){
    // Serve static files from '/frontend/build' in production
    app.use(express.static(path.join(__dirname, "/frontend/build")))

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")));
// This line serves the 'index.html' file located in the 'frontend/build' directory.

} else {
    // For all other routes, respond with "Api is running..."
    app.get("/", (req, res)=>{
        res.send("Api is running...")
    })   
}

// Using the notFound middleware for handling 404 errors
app.use(notFound);

// Using the errorHandler middleware for handling errors
app.use(errorHandler);

// Starting the server and listening on the specified port
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
