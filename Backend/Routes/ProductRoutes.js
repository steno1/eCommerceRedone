// Importing necessary modules and dependencies

import { getProducts, getSingleProduct } from '../controllers/productController.js';

import express from "express";

const router = express.Router();

// Setting up a route to handle GET requests to the root path ('/')
router.route("/").get(getProducts);

// Setting up a route to handle GET requests with a parameter 'id'
// This can be accessed as req.params.id in the handler function
router.route("/:id").get(getSingleProduct);

// Exporting the router to be used in other parts of the application
export default router;
