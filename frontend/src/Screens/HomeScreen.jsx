// This line imports the CSS file './home.css'.

import "./home.css";

import { Col, Row } from "react-bootstrap";

import Product from "../Components/Product.jsx";
import React from 'react';
import { useGetProductsQuery } from "../slices/productApiSlice";

// This defines a functional component named `HomeScreen`.
const HomeScreen = () => {

  // This line uses the `useGetProductsQuery` hook, which returns an object with data about products, loading state, and errors.
  const { data: products, isLoading, error } = useGetProductsQuery();

  // This is the component's return statement.
  return (
    <>
      {/* This is a conditional rendering block. */}
      {isLoading ? (  
        // If `isLoading` is true, render a heading "Loading...".
        <h2>Loading...</h2>
      ) : error ? (  
        // If there is an error, render a div with the error message.
        <div>
          {error?.data?.message || error.error}
        </div>
      ) : (
        // If there are no errors and data is loaded, render the following content:
        <>
          <h1>Freshest Arrivals</h1>
          {/* This is a Bootstrap Row component. */}
          <Row>
            {/* This is a mapping function that iterates over the `products` array and renders a `Col` component for each product. */}
            {products.map((product, index) => (
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
