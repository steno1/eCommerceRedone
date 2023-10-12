// Importing the Product model from 'productsModel.js'

import Product from '../model/productsModel.js';
import asyncHandler from 'express-async-handler';

// Importing middleware for handling asynchronous routes


// Handler function for fetching all products
const getProducts = asyncHandler(async (req, res) => {
    // Using asyncHandler to handle asynchronous operations in the route handler
    const products = await Product.find({}); // Finding all products in the database
    return res.json(products); // Sending a JSON response with the products
});

// Handler function for getting a single product by its ID
const getSingleProduct = asyncHandler(async (req, res) => {
    // Using asyncHandler to handle asynchronous operations in the route handler
    const singleProduct = await Product.findById(req.params.id); // Finding a product by its ID
    
    if (singleProduct) {
        return res.json(singleProduct); // If the product is found, send it as a JSON response
    }
    
    res.sendStatus(404); // If the product is not found, set the response status to "Not Found"
});

export { getProducts, getSingleProduct };
