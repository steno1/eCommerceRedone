import { Button, Col, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FormContainer from '../Components/formContainer';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';
import { setCredential } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRegisterUserMutation } from '../slices/userApiSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const RegisterScreen = () => { 
  // Defined a functional component named 'RegisterScreen'

  const [email, setEmail] = useState(""); 
  // Declared a state variable 'email' and a function 'setEmail' to update it. Initialized with an empty string.

  const [password, setPassword] = useState(""); 
  // Declared a state variable 'password' and a function 'setPassword' to update it. Initialized with an empty string.

  const [name, setName] = useState(""); 
  // Declared a state variable 'name' and a function 'setName' to update it. Initialized with an empty string.

  const [confirmPassword, setConfirmPassword] = useState("");
  // Declared a state variable 'confirmPassword' and a function 'setConfirmPassword' to update it. Initialized with an empty string.

  const dispatch = useDispatch(); 
  // Initialized a variable 'dispatch' with the value returned by the 'useDispatch' hook.

  const navigate = useNavigate(); 
  // Initialized a variable 'navigate' with the value returned by the 'useNavigate' hook.

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const { userInfo } = useSelector((state) => state.auth); 
  // Extracted 'userInfo' from the state using 'useSelector' hook.

  const { search } = useLocation(); 
  // Extracted 'search' from the return value of 'useLocation' hook.

  const sp = new URLSearchParams(search); 
  // Created a new URLSearchParams object 'sp' from 'search'.

  const redirect = sp.get("redirect") || "/"; 
  // Initialized 'redirect' with the value of 'redirect' query parameter from the URL or "/" if it's not present.

  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]); 
  // Used 'useEffect' to conditionally navigate when 'userInfo' or 'redirect' changes.

  const submitHandler = async (e) => {
    e.preventDefault(); 
    // Prevented the default form submission behavior.
    if(password !== confirmPassword){
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await registerUser({
          name,
          email,
          password,
        }).unwrap(); 
        // Called 'registerUser' mutation and unwrapped the result.

        dispatch(setCredential({ ...res })); 
        // Dispatched 'setCredential' action with the result as an argument.

        navigate(redirect); 
        // Navigated to the 'redirect' route.
      } catch (error) {
        toast.error(error?.data?.message || error.error); 
        // Displayed an error toast with the message from the error object.
      }
    }
  }

  return (
    <FormContainer> 
      {/* Used 'FormContainer' component as a wrapper.*/} 
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}> 
        {/* Created a form with 'submitHandler' as the submit event handler. */} 
        <Row>
          <Form.Group controlId="name" className='my-3'>
            <Form.Label>Name</Form.Label> 
            {/* Created a form label for name. */}
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> 
            {/* Created an input field for name with controlled value and event handler to update 'name' state. */}
          </Form.Group>

          <Form.Group controlId="email" className='my-3'>
            <Form.Label>Email</Form.Label> 
            {/* Created a form label for email. */}
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> 
            {/* Created an input field for email with controlled value and event handler to update 'email' state. */}
          </Form.Group>

          <Form.Group controlId="password" className='my-3'>
            <Form.Label>Password</Form.Label> 
            {/* Created a form label for password. */}
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> 
            {/* Created an input field for password with controlled value and event handler to update 'password' state. */}
          </Form.Group>

          <Form.Group controlId="confirmPassword" className='my-3'>
            <Form.Label>Confirm Password</Form.Label> 
            {/* Created a form label for password. */}
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            /> 
            {/* Created an input field for password with controlled value and event handler to update 'password' state. */}
          </Form.Group>  
        </Row>

        <Button type="submit" variant="primary" disabled={isLoading}>
          Submit
        </Button> 
        {/* Created a submit button, disabled when 'isLoading' is true, with the label 'Submit'.*/}  

        {isLoading && <Loader/>} 
        {/* Rendered the 'Loader' component conditionally based on 'isLoading'.*/}   
      </Form>

      <Row>
        <Col className='py-3'>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link> 
          {/* Rendered a link to the registration page with conditional redirect query parameter*/}
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen; 
// Exported the 'RegisterScreen' component as the default export.
