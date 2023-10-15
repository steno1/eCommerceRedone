import User from '../model/userModel.js';
import asyncHandler from 'express-async-handler';

//auth User/Login
const authUser=asyncHandler(async(req, res)=>{
res.send("auth user")
})

//auth User/Login
const registerUser=asyncHandler(async(req, res)=>{
    res.send("Register user")
    })

    //Logout
const logoutUser=asyncHandler(async(req, res)=>{
    res.send("logout user")
    })

//getUserProfile
  const getUserProfile=asyncHandler(async(req, res)=>{
    res.send("get user profile")
    })

    //update getUserProfile
  const updateUserProfile=asyncHandler(async(req, res)=>{
    res.send("update user profile")
    })

//all users/Admin
const getUsers=asyncHandler(async(req, res)=>{

    res.send("get all users")
})

//delete
const deleteUsers=asyncHandler(async(req, res)=>{

    res.send("delete user")
})

//single user/getUserById

const getSingleUser=asyncHandler(async(req, res)=>{
   res.send("get single user or by id")
    })

    //update user
    const updateUsers=asyncHandler(async(req, res)=>{
        res.send("update users")
         })
  

export {authUser, getSingleUser, getUsers, getUserProfile, 
    updateUserProfile, updateUsers, registerUser, logoutUser,
deleteUsers}
