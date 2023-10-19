// Importing necessary components and hooks from external libraries

import { Button, Col, Form, FormCheck, FormGroup, FormLabel } from 'react-bootstrap'

import CheckoutStep from '../Components/CheckoutStep'
import FormContainer from '../Components/formContainer'
import React from 'react'
import { savePaymentMethod } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

// Defining a functional component named PaymentScreen
const PaymentScreen = () => {
    // Using the 'useState' hook to manage the state of 'paymentMethod' with initial value "PayPal"
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    
    // Accessing the Redux dispatch function
    const dispatch = useDispatch();
    
    // Accessing the navigate function from React Router
    const navigate = useNavigate();

    // Accessing the 'shippingAddress' from the Redux store
    const {shippingAddress} = useSelector((state) => state.cart);

    // useEffect hook to handle navigation when there's no shipping address
    useEffect(() => {
        if (!shippingAddress) {
            navigate("/shipping");
        }
    }, [shippingAddress, navigate]);

    // Event handler for form submission
    const submitHandler = (e) => {
        e.preventDefault();
        
        // Dispatching an action to save the selected payment method
        dispatch(savePaymentMethod(paymentMethod));
        
        // Navigating to the place order screen
        navigate("/placeorder");
    }

    return (
        // Wrapping the JSX in a 'FormContainer' component
        <FormContainer>
            {/* Rendering a CheckoutStep component with 'step1', 'step2', and 'step3' props */}
            <CheckoutStep step1 step2 step3/>
            {/* Rendering an h1 element with the text "Payment Method" */}
            <h1>Payment Method</h1>
            {/* Rendering a Form component */}
            <Form onSubmit={submitHandler}>
                {/* Rendering a FormGroup component with custom styles */}
                <FormGroup style={{color:"black", fontWeight:"600"}}>
                    {/* Rendering a FormLabel as legend with the text "Select Method" */}
                    <FormLabel as="legend">Select Method</FormLabel>
                    {/* Rendering a Col component */}
                    <Col>
                        {/* Rendering a FormCheck component (radio button) */}
                        <FormCheck
                            type='radio' className='my-2' 
                            label="Paypal or Credit Card" id='PayPal' 
                            name='paymentMethod' value="PayPal" checked
                            // Adding an event handler for when the radio button changes
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </FormCheck>
                    </Col>
                </FormGroup>
                {/* Rendering a Button component with type 'submit', variant 'primary', and custom class 'my-2' */}
                <Button type='submit' variant='primary' className='my-2'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

// Exporting the PaymentScreen component as the default export of this module
export default PaymentScreen
