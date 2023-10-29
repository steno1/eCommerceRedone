// Importing necessary modules

import Order from '../model/orderModel.js';
import asyncHandler from 'express-async-handler';

// Function to create new orders
const addOrderItems = asyncHandler(async (req, res) => {
  // Destructuring data from request body
  const {
    orderItems, shippingAddress, 
    paymentMethod, itemsPrice, taxPrice,
    shippingPrice, totalPrice
  } = req.body;

  // Checking if orderItems exist and is not empty
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Item");
  } else {
    // Creating a new Order object with provided data
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id:undefined
      })),
      user: req.user._id,
      shippingAddress, 
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    // Saving the order to the database
    const createdOrder = await order.save();
    // Sending the saved order as a JSON response
    res.status(201).json(createdOrder);
  }    
});

// Function to get logged in user orders
const getMyOrders = asyncHandler(async (req, res) => {
  // Finding orders for the logged in user
  const orders = await Order.find({ user: req.user._id });
  // Sending the orders as a JSON response
  res.status(200).json(orders);
});

// Function to get an order by its ID(single order details)
const getOrderById = asyncHandler(async (req, res) => {
  // Finding an order by its ID and populating user information
  const order = await Order.findById(req.params.id)
  .populate("user", "name email");

  // Checking if the order exists
  if (order) {
    // Sending the order as a JSON response
    res.status(200).json(order);
  } else {
    // Sending a 404 status and throwing an error if the order is not found
    res.status(404);
    throw new Error("Order not found");
  }
});

// function to update an order to paid(pay order)
const updateOrderToPaid = asyncHandler(async (req, res) => {
const order=await Order.findById(req.params.id)
if(order){
order.isPaid=true,
order.paidAt=Date.now();
order.paymentResult={
  id:req.body.id,
  status:req.body.status,
  update_time:req.body.update_time,
  email_address:req.body.payer.email_address
};
const updateOrder=await order.save();
res.status(200).json(updateOrder)
}else{
  res.status(404);
  throw new Error("Order not found")
}
});

// Placeholder function to update an order to delivered
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

// Placeholder function to get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders=await Order.find({}).populate("user", "id name");
  res.status(200).json(orders)
});

// Exporting all functions as an object
export {
  getAllOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
  addOrderItems,
  getMyOrders,
  getOrderById
};
