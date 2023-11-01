// This line imports the CSS file './home.css'.

import "./home.css";

import { Col, Row } from "react-bootstrap";

import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Product from "../Components/Product.jsx";
import React from 'react';
import { useGetProductsQuery } from "../slices/productApiSlice";
import { useParams } from "react-router-dom";

// This defines a functional component named `HomeScreen`.
const HomeScreen = () => {
  const {pageNumber}=useParams()

  // This line uses the `useGetProductsQuery` hook, which returns an object with data about products, loading state, and errors.
  const { data, isLoading, error } = useGetProductsQuery({pageNumber});

  // This is the component's return statement.
  return (
    <>
      {/* This is a conditional rendering block. */}
      {isLoading ? (  
        // If `isLoading` display Loader component".
       <Loader/>
      ) : error ? (  
        // If there is an error, render a Message component with the error message.
        <Message variant="danger">
            {error?.data?.message || error.error}
        </Message>
       
      ) : (
        // If there are no errors and data is loaded, render the following content:
        <>
          <h1>Freshest Arrivals</h1>
          {/* This is a Bootstrap Row component. */}
          <Row>
            {/* This is a mapping function that iterates over the `products` array and renders a `Col` component for each product. */}
            {data.products.map((product, index) => (
              <Col sm={12} md={6} lg={4} xl={4} key={index}>
                {/* This renders the `Product` component and passes a `product` prop to it. */}
                <Product product={product}/>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

// This exports the `HomeScreen` component as the default export of this file.
export default HomeScreen;
