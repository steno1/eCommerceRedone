import mongoose from "mongoose"; // Importing the Mongoose library
import reviewSchema from "./reviewsModel.js"; // Importing the reviewSchema from a separate file

// Define a Mongoose schema for products
const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model using an Object ID
        required: true, // User is a required field
        ref: "User" // References the "User" model
    },
    name: {
        type: String,
        required: true // Name is a required field
    },
    image: {
        type: String,
        required: true // Image URL is a required field
    },
    brand: {
        type: String,
        required: true // Brand name is a required field
    },
    category: {
        type: String,
        required: true // Category is a required field
    },
    description: {
        type: String,
        required: true // Description is a required field
    },
    reviews: [reviewSchema], // Array of reviews conforming to the reviewSchema
    rating: {
        type: Number,
        required: true,
        default: 0 // Default value of 0 for product rating
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0 // Default value of 0 for number of reviews
    },
    price: {
        type: Number,
        required: true,
        default: 0 // Default value of 0 for product price
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0 // Default value of 0 for stock count
    }
}, {timestamps: true}); // Adds timestamps for when the product was created and last updated

// Create a Mongoose model named "Product" based on the productSchema
const Product = mongoose.model("Product", productSchema);

// Export the Product model
export default Product;
