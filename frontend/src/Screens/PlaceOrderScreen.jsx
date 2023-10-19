import {
     Button,
     Card,
     Col,
     Image,
     ListGroup,
     ListGroupItem,
     Row
} from 'react-bootstrap'

import CheckoutStep from '../Components/CheckoutStep'
import { Link } from 'react-router-dom'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import React from 'react'
import { clearCartItems } from '../slices/cartSlice'
import {toast} from "react-toastify"
import { useCreateOrderMutation } from '../slices/OrderApiSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PlaceOrderScreen = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const cart=useSelector((state)=>state.cart)
    useEffect(()=>{
        if(!cart.shippingAddress.address){
            navigate("/shipping")
        }else if(!cart.paymentMethod){
            navigate("/payment")
        }
    },[cart.paymentMethod,cart.shippingAddress.address, navigate])


   const [createOrder, {isLoading, error}]=useCreateOrderMutation() 
    const PlaceholderHandler=async()=>{
try {
   const res=await createOrder({
    orderItems:cart.cartItems,
    shippingAddress:cart.shippingAddress,
    paymentMethod:cart.paymentMethod,
    itemsPrice:cart.itemsPrice,
    shippingPrice:cart.shippingPrice,
    taxPrice:cart.taxPrice,
    totalPrice:cart.totalPrice
   }).unwrap();
   dispatch(clearCartItems());
   navigate(`/order/${res._id}`)
} catch (error) {
   toast.error(error) 
}
    }
  return (
    <>
    <CheckoutStep step1 step2 step3 step4/>
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h2>Shipping</h2>
                    <p>{cart.shippingAddress.address},{" "}
                    {cart.shippingAddress.city}, {" "}
                    
                    {cart.shippingAddress.postalCode},{" "}
                    {cart.shippingAddress.country}.
                    </p>

                </ListGroupItem>
                <ListGroupItem>
                    <h2>Payment Method</h2>
            <strong>Payment Method: </strong>
          {cart.paymentMethod}
                </ListGroupItem>
                <ListGroupItem>
                <h2>Order Items</h2>
                {cart.cartItems.length===0?(
                    <Message>Your Cart is empty!</Message>
                ):(
                 <ListGroup>
                    {cart.cartItems.map((item, index)=>(
                        <ListGroupItem key={index}>
                                <Row>
                                    <Col md={2}>
                     <Image src={item.image} 
                     alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col>
                        <Link to={`/products/${item.product}`}>
                                    {item.name}
                                    </Link>
                                    </Col>
                                    <Col md={4} style={{color:"black"}}>
                            {item.qty} x {item.price}=₦{item.qty * item.price}
                                    </Col>
                                </Row>
                        </ListGroupItem>
                    ))}
                 </ListGroup>   
                )}
                </ListGroupItem>


            </ListGroup>
        </Col>
        <Col md={4}>
             <Card>
<ListGroup variant='flush'>
<ListGroupItem>
    <h2>Order Summary</h2>
</ListGroupItem>
<ListGroupItem>
<Row>
    <Col style={{color:"black"}}>Items Price: </Col>
    <Col style={{color:"black"}}>₦{cart.itemsPrice}</Col>
</Row>

</ListGroupItem>
<ListGroupItem>
<Row>
    <Col style={{color:"black"}}>Shipping: </Col>
    <Col style={{color:"black"}}>₦{cart.shippingPrice}</Col>
</Row>

</ListGroupItem>
<ListGroupItem>
<Row>
    <Col style={{color:"black"}}>Tax: </Col>
    <Col style={{color:"black"}}>₦{cart.taxPrice}</Col>
</Row>

</ListGroupItem>
<ListGroupItem>
<Row>
    <Col style={{color:"black"}}>Total: </Col>
    <Col style={{color:"black"}}>₦{cart.totalPrice}</Col>
</Row>

</ListGroupItem>
<ListGroupItem>
    {error &&  <Message variant='danger'>{error}</Message> }
   
</ListGroupItem>
<ListGroupItem>
<Button type='button' className='btn-block'
disabled={cart.cartItems.length===0}
 onClick={PlaceholderHandler}>
    Place Order
 </Button>
 {isLoading && <Loader/>}

</ListGroupItem>
</ListGroup>
             </Card>

        </Col>
    </Row>
    </>
  )
}

export default PlaceOrderScreen
