import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutStep from '../Components/CheckoutStep';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { clearCartItems } from '../slices/cartSlice';
import { toast } from "react-toastify";
import { useCreateOrderMutation } from '../slices/OrderApiSlice';
import { useNavigate } from 'react-router-dom';

const PlaceOrderScreen = () => {
  // Hooks for navigation, dispatch, and getting cart state
  const navigate = useNavigate(); // Provides navigation function for changing routes
  const dispatch = useDispatch(); // Provides access to the Redux dispatch function
  const cart = useSelector((state) => state.cart); // Retrieves cart state from Redux store

  useEffect(() => {
    // Redirect logic based on shipping address and payment method
    if (!cart.shippingAddress.address) {
      navigate("/shipping"); // Redirects to shipping page if address is not set
    } else if (!cart.paymentMethod) {
      navigate("/payment"); // Redirects to payment page if payment method is not set
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  // Mutation hook for creating an order
  const [createOrder, { isLoading, error }] = useCreateOrderMutation(); // Retrieves mutation function and loading state

  // Function to handle placing an order
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        // Sends order details to the server
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      }).unwrap(); // Unwraps the response from the createOrder function

      // Clear the cart items after placing the order
      dispatch(clearCartItems()); // Dispatches Redux action to clear cart items
      navigate(`/order/${res._id}`); // Redirects to the order confirmation page
    } catch (error) {
      toast.error(error.message); // Displays an error message using a toast notification
    }
  };

  return (
    <>
      <CheckoutStep step1 step2 step3 step4 /> {/* Renders a custom component for checkout steps */}
      <Row> {/* Bootstrap component for row layout */}
        <Col md={8}> {/* Bootstrap component for column layout */}
          <ListGroup variant='flush'> {/* Bootstrap component for list group */}
            <ListGroupItem>
              <h2>Shipping</h2> {/* Heading for shipping details */}
              <p>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}.
              </p> {/* Displaying shipping address details */}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2> {/* Heading for payment method */}
              <strong>Payment Method: </strong>
              {cart.paymentMethod}
            </ListGroupItem> {/* Displaying selected payment method */}
            <ListGroupItem>
              <h2>Order Items</h2> {/* Heading for ordered items */}
              {cart.cartItems.length === 0 ? ( // Conditional rendering based on cart items
                <Message>Your Cart is empty!</Message> // Displayed if cart is empty
              ) : (
                <ListGroup> {/* Nested list group for displaying ordered items */}
                  {cart.cartItems.map((item, index) => ( // Mapping through cart items
                    <ListGroupItem key={index}> {/* List group item for each ordered item */}
                      <Row> {/* Bootstrap component for row layout */}
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded /> {/* Displaying product image */}
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link> {/* Link to product details */}
                        </Col>
                        <Col md={4} style={{ color: "black" }}>
                          {item.qty} x {item.price} = ₦{item.qty * item.price} {/* Displaying quantity, price, and total price */}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}> {/* Bootstrap component for column layout */}
          <Card> {/* Bootstrap component for card */}
            <ListGroup variant='flush'> {/* Bootstrap component for list group */}
              <ListGroupItem>
                <h2>Order Summary</h2> {/* Heading for order summary */}
              </ListGroupItem>
              <ListGroupItem>
                <Row> {/* Bootstrap component for row layout */}
                  <Col style={{ color: "black" }}>Items Price: </Col> {/* Styling for column */}
                  <Col style={{ color: "black" }}>${cart.itemsPrice}</Col> {/* Displaying items price */}
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row> {/* Bootstrap component for row layout */}
                  <Col style={{ color: "black" }}>Shipping: </Col> {/* Styling for column */}
                  <Col style={{ color: "black" }}>${cart.shippingPrice}</Col> {/* Displaying shipping price */}
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row> {/* Bootstrap component for row layout */}
                  <Col style={{ color: "black" }}>Tax: </Col> {/* Styling for column */}
                  <Col style={{ color: "black" }}>${cart.taxPrice}</Col> {/* Displaying tax price */}
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row> {/* Bootstrap component for row layout */}
                  <Col style={{ color: "black" }}>Total: </Col> {/* Styling for column */}
                  <Col style={{ color: "black" }}>${cart.totalPrice}</Col> {/* Displaying total price */}
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant='danger'>{error.message}</Message>} {/* Displaying error message if there's an error */}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0} // Disabling the button if cart is empty
                  onClick={placeOrderHandler} // Triggering placeOrderHandler function on click
                >
                  Place Order
                </Button> {/* Button for placing the order */}
                {isLoading && <Loader />} {/* Displaying a loader while processing */}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderScreen; // Exporting the component
