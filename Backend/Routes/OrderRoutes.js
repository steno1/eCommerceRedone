import {
    addOrderItems,
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid
} from "../controllers/OrderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

import express from "express"

const router=express.Router();

router.route("/").post(protect, addOrderItems)
.get(protect, admin, getAllOrders)
router.route("/mine").get(protect, getMyOrders)
router.route("/:id").get(protect, admin,getOrderById)
router.route("/:id/pay").put(protect, admin, updateOrderToPaid)
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered)


export default router
