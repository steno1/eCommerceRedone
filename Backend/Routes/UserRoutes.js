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

//Admin
router.route("/").get(getUsers)
//Admin
router.route("/:id").get(getSingleUser)
//Admin
router.route("/:id").delete(deleteUsers)
//Admin
router.route("/:id").put(updateUsers)

router.route("/logout").post(logoutUser)

router.route("/login").post(authUser)
router.route("/profile").get(getUserProfile)
router.route("/profile").put(updateUserProfile)


export default router;


