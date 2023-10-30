// Importing the Product model from 'productsModel.js'

import Product from '../model/productsModel.js';
import asyncHandler from 'express-async-handler';

// Importing the 'express-async-handler' middleware for handling asynchronous operations


/* Access is private, typically restricted to admin users */
// Handler function for creating a new product
const createProduct = asyncHandler(async (req, res) => {
    // Creating a new product object based on the Product model
const product = new Product({
    // Setting the name property of the product to "Sample name"
    name: "Sample name",
    
    // Setting the price property of the product to 0
    price: 0,
    
    // Setting the user property of the product to the ID of the user making the request
    user: req.user._id,
    
    // Setting the image property of the product to "/images/sample.jpg"
    image: "/images/sample.jpg",
    
    // Setting the brand property of the product to "Sample brand"
    brand: "Sample brand",
    
    // Setting the countInStock property of the product to 0
    countInStock: 0,
    
    // Setting the numReviews property of the product to 0
    numReviews: 0,
    
    // Setting the description property of the product to "Sample description"
    description: "Sample description",
    
    // Setting the category property of the product to "sample"
    category: "sample"
});


    // Saving the newly created product to the database
    const createdProduct = await product.save();

    // Sending a JSON response with the created product and a status code of 201 (Created)
    res.status(201).json(createdProduct);
});

// Handler function for fetching all products
const getProducts = asyncHandler(async (req, res) => {
    // Using asyncHandler to handle asynchronous operations in the route handler
    // Fetching all products from the database
    const products = await Product.find({});

    // Sending a JSON response with the array of products
    return res.json(products);
});

// Handler function for getting a single product by its ID
const getSingleProduct = asyncHandler(async (req, res) => {
    // Using asyncHandler to handle asynchronous operations in the route handler
    // Finding a product in the database based on the provided ID in the request parameters
    const singleProduct = await Product.findById(req.params.id);

    // If the product is found, send it as a JSON response
    if (singleProduct) {
        return res.json(singleProduct);
    }

    // If the product is not found, set the response status to "Not Found" (HTTP 404)
    res.sendStatus(404);
});

const updateProduct=asyncHandler(async(req, res)=>{
const {name, price,description, image, brand,
     category, countInStock}=req.body;
     const product=await Product.findById(req.params.id);
     if(product){
        product.name=name,
        product.price=price,
        product.description=description,
        product.image=image,
        product.brand=brand,
        product.category=category,
        product.countInStock=countInStock;

        const updatedProduct=await product.save();
        res.json(updatedProduct)
     }else{
        res.status(404);
        throw new Error("Resource not found")
     }
})

// Exporting the handler functions to be used in the Express routes
export { getProducts, getSingleProduct, createProduct, updateProduct };
