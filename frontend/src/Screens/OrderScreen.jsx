import {
    Button,
    Card,
    Col,
    Form,
    Image,
    ListGroup,
    ListGroupItem,
    Row
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import React, { useEffect } from 'react';
import {
    useGetOrderDetailsQuery,
    useGetPayPalClientIdQuery,
    usePayOrderMutation
} from "../slices/OrderApiSlice";

import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {toast}from "react-toastify";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { useState } from "react";

const OrderScreen = () => {
    const [hovered, setHovered] = useState(false);
      // Extract the 'id' parameter from the URL
    const { id: orderId } = useParams();
// Using the "useParams" hook to extract the 'id' parameter from the URL.
  
 // Fetch order details based on the orderId
 const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);
// Using a custom hook "useGetOrderDetailsQuery" to fetch order details based on the orderId.
  
// Mutate order to mark it as paid
 const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
 // Using a custom mutation hook "usePayOrderMutation" to mark an order as paid.
  
      // Manage PayPal script loading and state
      const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
      // Using a custom hook for managing PayPal script loading and state.
  
      // Fetch PayPal client ID
      const { data: paypal, isLoading: loadingPaypal,
         error: errorPayPal } = useGetPayPalClientIdQuery();
      /*
        Using the "useGetPayPalClientIdQuery" hook to fetch the PayPal client ID.
        It destructures the returned data into "data" (containing the PayPal client ID),
        "isLoading" (loading state), and "error" (error state).
      */
  
      // Access user info from Redux state
      const { userInfo } = useSelector((state) => state.auth);
      // Using the "useSelector" hook to access user info from the Redux state.
  
      // This effect runs when the component mounts or when dependencies change
      useEffect(() => {
          // Check if PayPal data is available and no loading/error state
          if (!errorPayPal && !loadingPaypal && paypal.clientId) {
              // Define a function to load PayPal script
              const loadPayPalScript = async () => {
                  // Reset PayPal options with client ID and currency
                  paypalDispatch({
                      type: "resetOptions",
                      value: {
                          "client-id": paypal.clientId,
                          currency: "USD",
                      },
                  });
                  // Set loading status to pending
                  paypalDispatch({
                      type: "setLoadingStatus",
                      value: "pending"
                  });
              }
  
       // Check if the order is valid and not paid
       if (order && !order.isPaid) {
            // If PayPal script is not already loaded, load it
           if (!window.paypal) {
                      loadPayPalScript();
                  }
              }
          }
      }, [order, paypal, loadingPaypal, paypalDispatch, errorPayPal]);
      /*
        This effect runs when the component mounts or when dependencies change.
        It checks if PayPal data is available and there are no loading or error states.
        If conditions are met, it loads the PayPal script.
      */
        function onApprove(data, actions){
            // This function is called when the user approves the payment using PayPal.
        
            return actions.order.capture().then(async function (details){
                // Capture the payment and get transaction details.
        
                try {
                    // Try to pay the order with provided details.
                    await payOrder({orderId, details});
                    // Mark the order as paid.
        
                    refetch();
                    // Refresh the order details.
        
                    toast.success("payment successfully")
                    // Show a success toast message.
                } catch (error) {
                    // If an error occurs during payment.
                    toast.error(error?.data?.message || error.message) 
                    // Show an error toast message.
                }
            })
        }
        
        // Function to handle payment approval.
        
        async function onApproveTest(){
            // This function is used for testing payment approval.
        
            await payOrder({orderId, details: { payer: {} }});
            // Simulate payment approval with an empty payer object.
        
            refetch();
            // Refresh the order details.
        
            toast.success("payment successfully")
            // Show a success toast message.
        }
        
          // Function to handle payment errors.
        
        function onError(){
      // This function is called if an error occurs during the payment process.
        
            toast.error(error.message)
            // Show an error toast message.
        }
        
        function createOrder(data, actions){
     // This function is called when it's time to create an order object for PayPal to process.
        
            return actions.order.create({
   // Using the "actions.order.create" method to specify details about the order.
                purchase_units:[
     // Defining the purchase units. In this case, there's only one unit.
                    {
           amount:{
         // Describing the amount for this purchase unit.
           value: order.totalPrice,
      // Setting the value of the order total price.
                        }
                    }
                ]
            }).then((orderId)=>{
// Once the order is successfully created, this promise resolves with the order ID.
        
                return orderId
                // Returning the order ID.
            });
            // Returning the promise generated by "actions.order.create".
        }
        
  
      // Render a loading spinner if data is loading
      if (isLoading) {
          return <Loader />;
      }
      // Render an error message if there is an error
      else if (error) {
          return <Message variant='danger'>{error.message}</Message>;
      }
      // Render the order details if data is available
      else {
          return (
              <>
                  {/* Display the order number */}
                  <h3 style={{ color: "black" }}>Order No: {orderId}</h3>
                  <Row>
                      <Col md={8}>
                          {/* Display shipping information */}
                          <ListGroup variant="flush">
                              <ListGroupItem style={{ color: "black" }}>
                                  <h2>Shipping</h2>
                                  <p><strong>Name: </strong>{order.user.name}</p>
                                  <p><strong>Email: </strong>{order.user.email}</p>
                                  <p><strong>Address: </strong>{order.shippingAddress.address},
                                      {" "}{order.shippingAddress.city},{" "}
                                      {order.shippingAddress.postalCode},{" "}
                                      {order.shippingAddress.country}.</p>
                                  {/* Display delivery status */}
                                  {order.isDelivered ? (
                                      <Message variant="success">{order.deliveredAt}</Message>
                                  ) : (
                                      <Message variant="danger">Not Delivered</Message>
                                  )}
                              </ListGroupItem>
                              {/* Display payment method */}
                              <ListGroupItem style={{ color: "black" }}>
                                  <h2>Payment Method</h2>
                                  <p><strong>Method: </strong></p>
                                  <p style={{ marginBottom: "15px" }}>{order.paymentMethod}</p>
  
                                  {/* Display payment status */}
                                  {order.isPaid ? (
                                      <Message variant="success">
                                          Paid on {order.paidAt}
                                      </Message>
                                  ) : (
                                      <Message variant="danger">
                                          Not Paid
                                      </Message>
                                  )}
                              </ListGroupItem>
                              {/* Display ordered items */}
                              <ListGroupItem style={{ color: "black" }}>
                                  <h2>Order Items</h2>
                                  {order.orderItems.map((item, index) => (
                                      <ListGroupItem key={index} style={{ color: "black" }}>
                                          <Row>
                                              <Col md={2}>
                                                  <Image src={item.image} fluid rounded />
                                              </Col>
                                              <Col>
                                                  <Link to={`/product/${item.product}`}>
                                                      {item.name}
                                                  </Link>
                                              </Col>
                                              <Col md={4}>
                                                  {item.qty} x  ₦{item.price} = ₦{item.qty * item.price}
                                              </Col>
                                          </Row>
                                      </ListGroupItem>
                                  ))}
                              </ListGroupItem>
                          </ListGroup>
                      </Col>
                      <Col md={4}>
                          {/* Display order summary */}
                          <Card>
                              <ListGroup>
                                  <ListGroupItem style={{ color: "black" }}>
                                      <h2>Order Summary</h2>
                                      <Row>
                                          <Col style={{ fontSize: "900" }}>Items</Col>
                                          <Col ><p >{order.itemsPrice}</p></Col>
                                      </Row>
                                      <Row>
                                          <Col><p>Shipping</p></Col>
                                          <Col>${order.shippingPrice}</Col>
                                      </Row>
                                      <Row>
                                          <Col>Tax</Col>
                                          <Col><p>${order.taxPrice}</p></Col>
                                      </Row>
                                      <Row>
                          <Col>Total</Col>
                        <Col><p>${order.totalPrice}</p></Col>
                                      </Row>
                          {!order.isPaid && (
                              <ListGroupItem>
                            {loadingPay && <Loader/>} 
                              {isPending?<Loader/>:(
                                <div>
                                    {/* 
                                  <Button
      onClick={onApproveTest}
      style={{
        marginBottom: "10px",
        backgroundColor: hovered ? "#AE445A" : "#662549",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Test pay order
    </Button>
*/}
                 <div>
            <PayPalButtons createOrder={createOrder}
                   onApprove={onApprove}
                       onError={onError}
                                    ></PayPalButtons>
                                         </div>
                                         </div>
                                              )}    
                                          </ListGroupItem>
                                      )}
                                  </ListGroupItem>
                              </ListGroup>
                          </Card>
                      </Col>
                  </Row>
              </>
          );
      }
  }
  
  export default OrderScreen;
  