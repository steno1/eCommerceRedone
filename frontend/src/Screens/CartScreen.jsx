// Importing necessary components and libraries

import { Button, Card, Col, Form, FormControl, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'; // Importing specific components from react-bootstrap library
import { addToCart, removeFromCart } from '../slices/cartSlice'; // Importing functions from 'cartSlice' slice

import { FaTrash } from 'react-icons/fa'; // Importing 'FaTrash' icon from react-icons/fa
import { Link } from 'react-router-dom'; // Importing 'Link' component from react-router-dom
import Message from '../Components/Message'; // Importing 'Message' component from '../Components'
import React from 'react'; // Importing 'React' from 'react' library
import { useDispatch } from 'react-redux'; // Importing 'useDispatch' hook from react-redux library
import { useNavigate } from 'react-router-dom'; // Importing 'useNavigate' hook from react-router-dom library
import { useSelector } from 'react-redux'; // Importing 'useSelector' hook from react-redux library

// Define a functional component called CartScreen
const CartScreen = () => {
    // Initialize useDispatch and useSelector hooks to access Redux store
    const dispatch = useDispatch(); // Initializing 'dispatch' function from useDispatch hook
    const navigate = useNavigate(); // Initializing 'navigate' function from useNavigate hook
    const { cartItems } = useSelector((state) => state.cart); // Destructuring 'cartItems' from the Redux store

    // Define a function to handle adding items to the cart
    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({
            ...product, // Spreading 'product' object
            qty // Setting 'qty' property
        }));
    }

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id)); // Dispatching 'removeFromCart' action with 'id'
    }

    const checkOutHandler = () => {
        navigate("/shipping"); // Navigating to "/login?redirect=/shipping"
    }

    // Render JSX
    return (
        <>
            <Row>
                <Col md={8}>
               <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>

       {/* Conditional rendering based on cartItems length */}
          {cartItems.length === 0 ? ( // If 'cartItems' is empty
                <Message variant='danger'> 
                   Cart is empty<Link to='/'> Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                  {cartItems.map((item, index) => {
                  return <ListGroupItem key={index}>
                       <Row>
                        <Col md={2}>
              <Image src={item.image} alt={item.name} fluid rounded />
                             </Col>
                         <Col md={3}>
                          <Link to={`/product/${item._id}`}>
                        {item.name} 
                          </Link>
                          </Col>
                           <Col md={2}>
                  ₦{item.price} 
                          </Col>
                      <Col md={2}>
                     <Form>
                 <FormControl as="select" value={item.qty} 
      onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                {[...Array(item.countInStock).keys()].map((x) => (
                     <option key={x + 1} value={x + 1}
              style={{ backgroundColor: "black", color: "white" }}>
                      {x + 1} 
                              </option>
                                 ))}
                              </FormControl>
                                 </Form>
                                        </Col>
                                        <Col md={2}>
                        <Button type="button" variant='light' 
                    onClick={() => removeFromCartHandler(item._id)}>
                       <FaTrash /> 
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            })}
                        </ListGroup>
                    )}
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                           {/* Displaying subtotal */}
          <h2>Subtotal({cartItems.reduce((acc, curr) => acc + curr.qty, 0)})</h2> 
          ₦{cartItems.reduce((acc, curr) => acc + curr.qty * curr.price, 0).toFixed(2)} 
                          </ListGroupItem>
                            <ListGroupItem>
                        {/* Button to proceed to checkout */}
                   <Button type="button" className='btn-block' 
          disabled={cartItems.length === 0} onClick={checkOutHandler}>
                                    Proceed to Checkout
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CartScreen
