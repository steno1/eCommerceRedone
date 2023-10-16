import {StatusCodes} from 'http-status-codes'; // Importing HTTP status codes for handling responses.
import User from "../model/userModel.js"; // Importing the User model from "../model/userModel".
import asyncHandler from 'express-async-handler'; // Importing middleware for handling asynchronous routes.
import jwt from "jsonwebtoken"; // Importing the JWT library for handling JSON Web Tokens.

// Protect routes middleware
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read the JWT from the cookie
    token = req.cookies.jwt; // Attempting to extract JWT token from cookies.

    if (token) { // Checking if a token was found in the cookie.
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifying the token's authenticity.
            req.user = await User.findById(decoded.userId).select("-password"); // Extracting user information from the token and attaching it to the request object.
            next(); // Moving on to the next middleware or route handler.
        } catch (error) {
            console.log(error); // Logging the error for debugging purposes.
            throw new Error("Not authorized, token failed"); // Throwing an error indicating token verification failed.
        }
    } else {
        res.status(StatusCodes.UNAUTHORIZED); // Setting the response status to unauthorized.
        throw new Error("Not authorized, no token"); // Throwing an error indicating no token was found.
    }
});

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) { // Checking if the user is logged in and has admin privileges.
        next(); // Moving on to the next middleware or route handler.
    } else {
        res.status(StatusCodes.UNAUTHORIZED); // Setting the response status to unauthorized.
        throw new Error("Not authorized as admin"); // Throwing an error indicating admin privileges are required.
    }
}

export { admin, protect }; // Exporting the admin and protect middleware for use in other parts of the application.
