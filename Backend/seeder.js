// Importing the Order model from the file ./model/orderModel.js

import Order from "./model/orderModel.js";
import Product from "./model/productsModel.js";
import User from "./model/userModel.js";
import colors from "colors";
import connectDB from "../config/db.js";
import dotenv from "dotenv";
import products from "../data/products.js";
import users from "../data/user.js";

dotenv.config();

// Connecting to the database using the 'connectDB' function
connectDB();

// A function to import data into the database
const importData = async () => {
    try {
        // Deleting all existing orders
        await Order.deleteMany();

        // Deleting all existing products
        await Product.deleteMany();

        // Deleting all existing users
        await User.deleteMany();

        // Inserting many users into the database and capturing the created users
        const createdUser = await User.insertMany(users);

        // Capturing the id of the first user (an admin user)
        const adminUser = createdUser[0]._id;

 // Creating an array of products, associating them with the admin user
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // Inserting many products into the database
        await Product.insertMany(sampleProducts);

        // Logging a success message with green color
        console.log("Data imported! ".green.inverse);

        // Exiting the process
        process.exit();

    } catch (error) {
        // Handling errors by logging an error message with red color
        console.error(`${error}`.red.inverse);

        // Exiting the process with a status code of 1 (indicating an error)
        process.exit(1);
    }
}

// A function to destroy all data in the database
const destroyData = async () => {
    try {
        // Deleting all existing orders
        await Order.deleteMany();

        // Deleting all existing products
        await Product.deleteMany();

        // Deleting all existing users
        await User.deleteMany();

        // Logging a success message with red color
        console.log("Data Destroyed!".red.inverse);

        // Exiting the process
        process.exit();

    } catch (error) {
        // Handling errors by logging an error message with red color
        console.error(`${error}`.red.inverse);

        // Exiting the process with a status code of 1 (indicating an error)
        process.exit(1);
    }
}

// Checking if the script was executed with the argument '-d'
if (process.argv[2] === "-d") {
    // If yes, then call the function to destroy data
    destroyData();
} else {
    // If no, then call the function to import data
    importData();
}
