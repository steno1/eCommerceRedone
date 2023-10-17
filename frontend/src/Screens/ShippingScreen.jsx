import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'; // Importing specific components from 'react-bootstrap'

import FormContainer from '../Components/formContainer'; // Importing a custom component 'FormContainer'
import React from 'react'; // Importing React object
import { saveShippingAddress } from '../slices/cartSlice'; // Importing function 'saveShippingAddress' from '../slices/cartSlice'
import { useDispatch } from 'react-redux'; // Importing the 'useDispatch' hook from 'react-redux'
import { useNavigate } from 'react-router-dom'; // Importing 'useNavigate' hook from 'react-router-dom'
import { useSelector } from 'react-redux'; // Importing the 'useSelector' hook from 'react-redux'
import { useState } from 'react'; // Importing the 'useState' hook from 'react'

const ShippingScreen = () => {
  const {shippingAddress} = useSelector((state) => state.cart); // Destructuring 'shippingAddress' from the Redux store

  // Initializing state variables with default values from 'shippingAddress'
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch(); // Initializing the 'dispatch' function for Redux actions
  const navigate = useNavigate(); // Initializing the 'navigate' function for navigating routes

  // Handler function for form submission
  const submitHandler = () => {
    try {
      dispatch(saveShippingAddress({ address, city, postalCode, country })); // Dispatching an action to save shipping address
      navigate("/payment"); // Navigating to the '/payment' route
    } catch (error) {
      console.log(error); // Logging any errors that occur
    }
  };

  // JSX for rendering the form
  return (
    <FormContainer>
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        {/* Form fields for address, city, postal code, and country */}
        <FormGroup controlId='address' className='my-2'>
          <FormLabel>Address</FormLabel>
          <FormControl
            type="text"
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ color: "black" }}
          />
        </FormGroup>

        <FormGroup controlId='city' className='my-2'>
          <FormLabel>City</FormLabel>
          <FormControl
            type="text"
            placeholder='Enter City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ color: "black" }}
          />
        </FormGroup>

        <FormGroup controlId='postalCode' className='my-2'>
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            type="text"
            placeholder='Enter Postal Code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            style={{ color: "black" }}
          />
        </FormGroup>

        <FormGroup controlId='country' className='my-2'>
          <FormLabel>Country</FormLabel>
          <FormControl
            type="text"
            placeholder='Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{ color: "black" }}
          />
        </FormGroup>

        {/* Button for form submission */}
        <Button type='submit' variant='primary' className='my-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen; // Exporting the ShippingScreen component
