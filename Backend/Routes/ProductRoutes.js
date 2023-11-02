// Importing necessary modules and dependencies

import { admin, protect } from '../middleware/authMiddleware.js';
import {
     createProduct,
     createProductReview,
     deleteProduct,
     getProducts,
     getSingleProduct,
     getTopProducts,
     updateProduct
} from '../controllers/productController.js';

import express from "express";

const router = express.Router();

// Setting up a route to handle GET requests to the root path ('/')
router.route("/").get(getProducts)
.post(protect, admin, createProduct);

router.get("/top", getTopProducts)

// Setting up a route to handle GET requests with a parameter 'id'
// This can be accessed as req.params.id in the handler function
router.route("/:id").get(getSingleProduct)
.put(protect, admin,updateProduct)
.delete(protect, admin, deleteProduct)
router.route('/:id/reviews').post(protect, createProductReview)

// Exporting the router to be used in other parts of the application
export default router;
