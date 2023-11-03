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

import checkObjectId from '../middleware/CheckObjectId.js';
import express from "express";

const router = express.Router();

// Setting up a route to handle GET requests to the root path ('/')
router.route("/").get(getProducts)
.post(protect, admin, createProduct);

router.get("/top", getTopProducts)

// Setting up a route to handle GET requests with a parameter 'id'
// This can be accessed as req.params.id in the handler function
router.route("/:id").get(
    checkObjectId, getSingleProduct)
.put(protect, admin, checkObjectId, updateProduct)
.delete(protect, admin,checkObjectId, deleteProduct)
router.route('/:id/reviews').post(protect,checkObjectId, createProductReview)

// Exporting the router to be used in other parts of the application
export default router;
