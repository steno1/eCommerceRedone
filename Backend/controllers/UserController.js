// Importing necessary dependencies

import GenerateToken from '../utils/GenerateToken.js'; // Importing a function for generating JWT tokens.
import {StatusCodes} from 'http-status-codes'; // Importing HTTP status codes for handling responses.
import User from '../model/userModel.js'; // Importing a user model.
import asyncHandler from 'express-async-handler'; // Importing middleware for handling asynchronous functions.

// Route handler for user authentication (Login)
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;  // Extracting email and password from request body
    const user = await User.findOne({ email: email });  // Finding user by email

    if (user && (await user.matchPassword(password))) {
        GenerateToken(res,user._id) // Generating and setting a JWT token in the response header.

        // Sending JSON response with user information
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
        });
    } else {
        // If user doesn't exist or password doesn't match, send an error response
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Invalid email or Password");
    }
});

// Defining the registerUser function with asyncHandler middleware.
const registerUser = asyncHandler(async (req, res) => {
    // Destructuring the user registration information from the request body.
    const { name, email, password } = req.body;

    // Checking if a user with the provided email already exists in the database.
    const userExist = await User.findOne({ email });

    if (userExist) {
        // If a user with the provided email already exists, respond with a 400 Bad Request status and throw an error.
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("User already exists"); // Informing the client that the user already exists.
    }

    // If the user with the provided email does not exist, proceed with user registration.
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        // If user registration is successful, generate a JWT token and set it in the response header.
        GenerateToken(res, user._id);

        // Responding to the client with a 201 Created status and a JSON object
        // containing user information (excluding the password).
        res.status(StatusCodes.CREATED).json({
            _id: user._id, // Unique identifier for the newly registered user.
            name: user.name,  // User's full name.
            email: user.email, // User's email address.
            isAdmin: user.isAdmin, // Indicates whether the user has administrative privileges.
        });

    } else {
        // If user registration fails for any reason, respond with a 400 Bad Request status and throw an error.
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Invalid user data"); // Informing the client that the provided user data is invalid.
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0), 
       
    });
    res.status(200).json({ message: "Logged out successfully" });
});

// Route handler for getting user profile
const getUserProfile = asyncHandler(async (req, res) => {
    // Retrieve the user's profile based on their unique ID from the database
    const user = await User.findById(req.user._id);

    if (user) {
        // If user is found, respond with a JSON object containing user information
        res.status(StatusCodes.OK).json({
            _id: user._id,    // Unique identifier for the user
            name: user.name,  // User's name
            email: user.email,  // User's email address
            isAdmin: user.isAdmin  // Indicates if the user has administrative privileges
        });
    } else {
        // If user is not found, respond with a 404 Not Found status and throw an error
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("User not found");
    }
});

// Route handler for updating user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user=await User.findById(req.user._id) 
    // Find the user by their unique identifier (ID) extracted from the request's user object.

    if(user){ 
        // If the user is found in the database.
        user.name=req.body.name || user.name; 
        // Update the user's name with the value from the request body, or keep the current value if not provided.
        
        user.email=req.body.email || user.email
        // Update the user's email with the value from the request body, or keep the current value if not provided.

        if(req.body.password){
            user.password=req.body.password
            // If a password is provided in the request body, update the user's password.
        }
        
        const updatedUser=await user.save();
        // Save the updated user object back to the database.

        res.status(StatusCodes.OK).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
        // Respond with a JSON object containing the updated user information.
    } else {
        // If the user is not found in the database.
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("User not found");
        // Respond with a 404 Not Found status and throw an error indicating that the user was not found.
    }
});
//access private admin
// Route handler for getting all users (Admin)
const getUsers = asyncHandler(async (req, res) => {
    const users=await User.find({});
    res.status(200).json(users)
});

// Route handler for deleting a user
//access is private/admin
const deleteUsers = asyncHandler(async (req, res) => {
   const user=await User.findById(req.params.id);
   if(user){

   if(user.isAdmin){
res.status(400);
throw new Error("Cannot delete Admin User")
   }
await User.deleteOne({
    _id:user._id
});
res.status(200).json({
    message:"User deleted successfully!"
})
}else{
    res.status(404);
    throw new Error("User not found")
}
});

//access private admin
// Route handler for getting a single user by ID
const getSingleUser = asyncHandler(async (req, res) => {
    const user=await User.findById(req.params.id).select(-password);
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404);
        throw new Error("User does not exist")
    }
});

// Route handler for updating user information
//admin access/private
const updateUsers = asyncHandler(async (req, res) => {
    const user=await User.findById(req.params.id)
    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        user.isAdmin=Boolean(req.body.isAdmin);

        const updatedUser=await user.save();
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin

        })
    }else{
        res.status(404);
        throw new Error("User not found")
    }
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
