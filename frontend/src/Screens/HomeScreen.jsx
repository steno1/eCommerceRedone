import "./home.css"

import  {Col, Row} from "react-bootstrap"

import Product from "../Components/Product.jsx"
import React from 'react'
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

const HomeScreen = () => {
  const [products, setProducts]=useState([]);
  useEffect(()=>{
const fetchProducts=async ()=>{
  try {
    const {data}=await axios.get("/api/products");
    if(data){
 setProducts(data);
    }
  } catch (error) {
    console.log(`Error fetching products: ${error}`)
  }
  
};
fetchProducts();

  },[])
  return (
    <>
      <h1>Newest Products</h1>
      <Row>
        {products.map((product)=>(
   <Col sm={12} md={6} lg={4} xl={4}  key={product._id}>
   <Product product={product}/>
   </Col>
 

        ))}
      </Row>
    </>
  )
}

export default HomeScreen
