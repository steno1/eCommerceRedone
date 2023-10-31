import { admin, protect } from "../middleware/authMiddleware.js";
import {
    authUser,
    deleteUsers,
    getSingleUser,
    getUserProfile,
    getUsers,
    logoutUser,
    registerUser,
    updateUserProfile,
    updateUsers
} from "../controllers/UserController.js";

import express from "express";

const router = express.Router();

router.route("/register").post(registerUser)
// admin for getUsers
.get(protect, admin, getUsers)


router.post("/logout", logoutUser)

router.post("/login", authUser)

//getting user profile
router.route("/profile").get(protect, getUserProfile)
.put(protect, updateUserProfile)

//Admin
router.route("/:id").get(admin, protect, getSingleUser)
.delete(protect, admin, deleteUsers)
.put(protect, admin, updateUsers)


export default router;


