import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/styles/bootstrap.custom.css"
import "./assets/styles/index.css"

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from './App';
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ProductScreen from './Screens/ProductScreen';
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom/client';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingScreen from './Screens/ShippingScreen';
import store from './store';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/product/:id' element={<ProductScreen/>}/>
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route path='/shipping' element={<ShippingScreen/>}/>
     
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

    <RouterProvider router={router} />
    </Provider>
  
  </React.StrictMode>
);

