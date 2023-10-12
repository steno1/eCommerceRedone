import mongoose from "mongoose"; // Importing the Mongoose library

const reviewSchema = new mongoose.Schema({
   name: {
     type: String,
     required: true // Name of the reviewer (String, required)
   },
   rating: {
     type: Number,
     required: true // Rating given by the reviewer (Number, required)
   },
   comment: {
     type: String,
     required: true // Comment given by the reviewer (String, required)
   },
   user: {
     type: mongoose.Schema.Types.ObjectId, // Reference to the User model using an Object ID
     required: true, // User is a required field
     ref: "User" // References the "User" model
   },
}, { timestamps: true }); // Adds timestamps for when the review was created and last updated

export default reviewSchema; // Exporting the reviewSchema for use in other files
