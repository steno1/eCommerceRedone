// Importing Bootstrap CSS files for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/styles/bootstrap.custom.css"
import "./assets/styles/index.css"

// Importing necessary components and libraries
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import AdminRoute from './Components/AdminRoutes';
// Importing various screens/components used in the application
import App from './App';
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import OrderListScreen from './Screens/admin/OrderListScreen';
import OrderScreen from './Screens/OrderScreen';
import { PayPalScriptProvider }from "@paypal/react-paypal-js";
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import PrivateRoute from './Components/PrivateRoute';
import ProductEditScreen from './Screens/admin/ProductEditScreen';
import ProductListScreen from './Screens/admin/ProductScreen';
import ProductScreen from './Screens/ProductScreen';
import ProfileScreen from './Screens/ProfileScreen';
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom/client';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingScreen from './Screens/ShippingScreen';
import store from './store';

// Creating a browser router using react-router-dom
const router = createBrowserRouter(
  createRoutesFromElements(
    // Defining routes for different pages/screens
    <Route path="/" element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>{/*  Route for the home screen*/} 
      <Route path='/product/:id' element={<ProductScreen/>}/>{/*  Route for individual product screen*/} 
      <Route path='/cart' element={<CartScreen/>}/> {/*Route for the shopping cart screen */} 
      <Route path='/login' element={<LoginScreen/>}/>{/* Route for the login screen*/}
      <Route path='/register' element={<RegisterScreen/>}/>{/*Route for the registration screen */}

      {/* Private Routes */}
      <Route path='' element={<PrivateRoute/>}> 
        <Route path='/shipping' element={<ShippingScreen/>}/> {/* Private route for shipping details*/}
        <Route path='/payment' element={<PaymentScreen/>}/> {/*Private route for payment details */}
        <Route path='/placeorder' element={<PlaceOrderScreen/>}/> {/*  Private route for placing an order*/}
        <Route path='/order/:id' element={<OrderScreen/>}/> {/*  Private route for viewing an order*/}
        <Route path='/profile' element={<ProfileScreen/>}/>
      </Route>


        {/* Admin Routes */}
        <Route path='' element={<AdminRoute/>}> 

        <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
        <Route path='/admin/productlist' element={<ProductListScreen/>}/>
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
      
      </Route>
    </Route>
  )
)

// Creating a root element for rendering the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the application components
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
