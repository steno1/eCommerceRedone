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
    // Set the number of products to display per page
    const pageSize = 6;
  
    // Determine the current page number from the request query parameters
    const page = Number(req.query.pageNumber) || 1;
  
    // Construct a keyword filter to search for products by name
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword, // Use a case-insensitive regular expression
            $options: "i"
          }
        }
      : {}; // An empty object means no specific keyword filter
  
    // Count the total number of products that match the filter
    const count = await Product.countDocuments({ ...keyword });

    // Using asyncHandler to handle asynchronous operations in the route handler
    // Fetching all products from the database
    const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page-1))

    return res.json({
        products,
        page,
        pages:Math.ceil(count/pageSize)
    });
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

// Define a controller function named createProductReview that handles adding a review for a product
const createProductReview = asyncHandler(async (req, res) => {
    // Destructure the 'rating' and 'comment' from the request body
    const { rating, comment } = req.body;
    
    // Find the product based on the provided ID in the request parameters
    const product = await Product.findById(req.params.id);

    // Check if the product exists
    if (product) {
        // Check if the user has already reviewed the product
        const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
        );

        // If the user has already reviewed the product, return an error response
        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed");
        }

        // Create a 'review' object with user's name, rating, comment, and user ID
        const review = {
            name: req.user.name,    // User's name from the request object
            rating: Number(rating), // Convert 'rating' to a number from the request body
            comment,                // Comment from the request body
            user: req.user._id      // User's ID from the request object
        };

        // Add the 'review' object to the 'reviews' array of the 'product'
        product.reviews.push(review);

        // Update the 'numReviews' property of the 'product' to the new number of reviews
        product.numReviews = product.reviews.length;

        // Calculate and update the 'rating' property of the 'product' based on the new review
        product.rating = product.reviews.reduce(
            (acc, curr) => acc + curr.rating,
            0
        ) / product.reviews.length;

        // Save the updated 'product' to the database
        await product.save();

        // Send a JSON response with a status code of 201 (Created) and a success message
        res.status(201).json({
            message: "Review added"
        });
    } else {
        // If the product is not found, set the response status to 404 (Not Found)
        res.status(404);

        // Throw an error to be caught by the error handling middleware
        throw new Error("Resource not found");
    }
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
});


// Define a controller function named deleteProduct which handles deletion of a product
const deleteProduct = asyncHandler(async (req, res) => {
    // Find the product in the database based on the provided ID
    const product = await Product.findById(req.params.id);

    // Check if a product with the provided ID was found
    if (product) {
        // If product is found, proceed with deletion
        await Product.deleteOne({
            _id: product._id // Delete the product with matching ID
        });
        
        // Send a JSON response with a 200 status code to indicate success
        res.status(200).json({
            message: "Product deleted" // Provide a success message
        });      
    } else {
        // If the product is not found, set a 404 status
        res.status(404);

        // Throw an error to be caught by the error handling middleware
        throw new Error("Product not found");  
    }
});

//Get to rated product
//access is public
const getTopProducts = asyncHandler(async (req, res) => {
   const products=await Product.find({}).sort({rating:-1}).limit(10);
   res.status(200).json(products)
});


// Exporting the handler functions to be used in the Express routes
export { getProducts, getSingleProduct,
     createProduct, updateProduct, deleteProduct,
      createProductReview,getTopProducts };
