// Importing necessary components and hooks from external libraries and local files

import {
    FormControl,
    Image,
} from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Rating from '../Components/Rating';
import Row from 'react-bootstrap/Row';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';
import { useGetSingleProductQuery } from '../slices/productApiSlice';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useState } from 'react';

const ProductScreen = () => {
      // Extracting 'id' from the URL params and fetching product data based on 'id'
      const {id:productId} = useParams(); // Extracting 'id' from the URL params
      const dispatch = useDispatch(); // Accessing the dispatch function from Redux
      const navigate = useNavigate(); // Accessing the navigate function from React Router
  
      const [qty, setQty] = useState(1); // Creating a state variable 'qty' and a function to update it
  
      // Fetching product data based on 'id' using a query from 'productApiSlice'
      const {data: product, isLoading, error} = useGetSingleProductQuery(productId);
  
      // Function to handle adding the product to the cart
      const addToCartHandler = () => {
          dispatch(addToCart({ // Dispatching the 'addToCart' action with the product and quantity
              ...product, // Spreading the properties of 'product' object
              qty // Including the quantity
          }));
          navigate("/cart"); // Navigating to the '/cart' route after adding to the cart
      }
  
      return (
          <>
            {/* Link to go back to the homepage */}
              <Link className='btn btn-light my-3' to="/">
                  Go Back
              </Link>
              
              {/* Conditional rendering based on loading and error states */}
              {isLoading ? (
                  <Loader/> // Displaying a loader if data is loading
              ) : error ? (
                  <Message variant="danger">
                      {error?.data?.message || error.error} {/* Displaying an error message */}
                  </Message>
              ) : (
                  // Render product details
                  <Row>
                      <Col md={5}>
                          {/* Display product image */}
                          <Image src={product.image} alt={product.name}
                           fluid/>
                      </Col>
                      <Col md={4}>
                          <ListGroup variant='flush'>
                              <ListGroup.Item >
                                  {/* Display product name */}
                                  <h3>{product.name}</h3>
                              </ListGroup.Item>
                              <ListGroup.Item >
                                  {/* Display product rating and review count */}
            <Rating value={product.rating} text={`${product.numReviews}
             Reviews`} />
                              </ListGroup.Item>
                              <ListGroup.Item >
                                  {/* Display product description */}
                                  <p style={{backgroundColor:"#004225", color:"white", padding:"8px"}}>
                                      {product.description}
                                  </p> 
                              </ListGroup.Item>
                          </ListGroup>
                      </Col>
                      <Col md={3}>
                          <Card >
                              <ListGroup variant='flush'>
                                  {/* Display product price */}
                                  <ListGroup.Item>
                                      <Row>
                                          <Col>Price:</Col>
                   <Col><strong> ₦{product.price}</strong></Col>
                                      </Row>
                                  </ListGroup.Item>
                                  {/* Display product availability status */}
                                  <ListGroup.Item>
                                      <Row>
                                          <Col>Status:</Col>
                              <Col><strong> {product.countInStock >
                       0 ? "In Stock" : "Out of Stock"}</strong></Col>
                                      </Row>
                                  </ListGroup.Item>
                     {product.countInStock > 0 && (
                             <ListGroup.Item>
                                 <Row>
                                  <Col>Quantity</Col>
                                     <Form>
                 <FormControl as="select" value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}>
                       {[...Array(product.countInStock).keys()].map((x) => (
                     <option key={x+1} value={x+1} 
                     style={{backgroundColor:"black", color:"white"}}>
                              {x+1}
                              </option>
                                   ))}
                                 </FormControl>
                                              </Form>
                                          </Row>
                                      </ListGroup.Item>
                                  )}
                 {/* Button to add product to cart */}
                    <ListGroup.Item>
            <Button variant="success" 
            style={{color:"white", fontSize:"16px"}}
             disabled={product.countInStock === 0}
              onClick={addToCartHandler}>
                                          Add To Cart
                                      </Button>
                                  </ListGroup.Item>
                              </ListGroup>
                          </Card>
                      </Col>
                  </Row>
              )}
          </>
      )
  }
  
  export default ProductScreen;
  