import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } 
from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import Loader from "../Components/Loader";
import Message from "../Components/Message";
import React from 'react'
import { useGetOrderDetailsQuery } from "../slices/OrderApiSlice";

const OrderScreen = () => {
    const {id:orderId}=useParams();
    const {data:order, isLoading, error, refetch}=useGetOrderDetailsQuery(orderId)
 console.log(order)
    return isLoading?<Loader/>:error?<Message variant='danger'>
        {error}</Message>:(
            <>
            <h3 style={{color:"black"}}>Order No: {orderId}</h3>
            <Row>
<Col md={8}>
<ListGroup variant="flush" >
    <ListGroupItem style={{color:"black"}}>
        <h2>Shipping</h2>
        <p><strong>Name: </strong>{order.user.name}</p>
        <p><strong>Email: </strong>{order.user.email}</p>
        <p><strong>Address: </strong>{order.shippingAddress.address},
        {" "}{order.shippingAddress.city},{" "}
        {order.shippingAddress.postalCode},{" "}
        {order.shippingAddress.country}.</p>
        {order.isDelivered?(
            <Message variant="success">{order.deliveredAt}</Message>
        ):(
<Message variant="danger">Not Delivered</Message>
        )}

    </ListGroupItem>
    <ListGroupItem style={{color:"black"}}>
        <h2>Payment Method</h2>
        <p><strong>Method: </strong></p>
      <p style={{marginBottom:"15px"}}>{order.paymentMethod}</p>  
        
        
            {order.isPaid?(
                <Message variant="success">
                    Paid on {order.paidAt}
                </Message>
            ):(
                <Message variant="danger">
                    Not Paid
                </Message>
            )}
        
    </ListGroupItem>
    <ListGroupItem style={{color:"black"}}>
        <h2>Order Items</h2>
        {order.orderItems.map((item, index)=>(
           
<ListGroupItem key={index} style={{color:"black"}}>
<Row>
    <Col md={2}>
        <Image src={item.image} fluid rounded/>
    </Col>
    <Col>
    <Link to={`/product/${item.product}`}>
        {item.name}
    </Link>
    </Col>
    <Col md={4}>
    {item.qty} x  ₦{item.price}= ₦{item.qty * item.price}
</Col>
</Row>
</ListGroupItem>
        ))}
    </ListGroupItem>
</ListGroup>

</Col>
<Col md={4}>
    <Card>
        <ListGroup>
            <ListGroupItem style={{color:"black"}}>
                <h2>Order Summary</h2>
                <Row>
                    <Col style={{fontSize:"900"}}>Items</Col>
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
            </ListGroupItem>
        </ListGroup>
    </Card>
</Col>

            </Row>
            </>
        );
}

export default OrderScreen

