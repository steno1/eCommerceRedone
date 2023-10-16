// Importing necessary dependencies

import User from '../model/userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

// JSON Web Token library
 // User model
 // Async handler utility

// Route handler for user authentication (Login)
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;  // Extracting email and password from request body
    const user = await User.findOne({ email: email });  // Finding user by email

    if (user && (await user.matchPassword(password))) {
        // If user exists and password matches
        const token = jwt.sign({ userId: user._id },
             process.env.JWT_SECRET, {
            expiresIn: "30d"  // Generating a JSON Web Token
        });

        // Setting JWT as HTTP-only cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000  // Expiry time of the cookie (30 days)
        });

        // Sending JSON response with user information
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
        });
    } else {
        // If user doesn't exist or password doesn't match, send an error response
        res.status(401);
        throw new Error("Invalid email or Password");
    }
});

// Route handler for user registration
const registerUser = asyncHandler(async (req, res) => {
    res.send("Register user");  // Placeholder response for user registration
});

// Route handler for user logout
const logoutUser = asyncHandler(async (req, res) => {
    res.send("logout user");  // Placeholder response for user logout
});

// Route handler for getting user profile
const getUserProfile = asyncHandler(async (req, res) => {
    res.send("get user profile");  // Placeholder response for getting user profile
});

// Route handler for updating user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("update user profile");  // Placeholder response for updating user profile
});

// Route handler for getting all users (Admin)
const getUsers = asyncHandler(async (req, res) => {
    res.send("get all users");  // Placeholder response for getting all users
});

// Route handler for deleting a user
const deleteUsers = asyncHandler(async (req, res) => {
    res.send("delete user");  // Placeholder response for deleting a user
});

// Route handler for getting a single user by ID
const getSingleUser = asyncHandler(async (req, res) => {
    res.send("get single user or by id");  // Placeholder response for getting a single user
});

// Route handler for updating user information
const updateUsers = asyncHandler(async (req, res) => {
    res.send("update users");  // Placeholder response for updating user information
});

// Exporting all the route handlers
export {
    authUser,
    getSingleUser,
    getUsers,
    getUserProfile,
    updateUserProfile,
    updateUsers,
    registerUser,
    logoutUser,
    deleteUsers
};
