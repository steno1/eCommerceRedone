import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import React from 'react'
import { setCredential } from '../slices/authSlice'
import {toast} from "react-toastify"
import { useGetMyOrdersQuery } from '../slices/OrderApiSlice'
import { useProfileMutation } from '../slices/userApiSlice'

const ProfileScreen = () => {
    const [name, setName]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [confirmPassword, setConfirmedPassword]=useState("")

    const dispatch=useDispatch();
const [profile, {isLoading:loadingUpdateProfile}]=useProfileMutation()

    const {userInfo}=useSelector((state)=>state.auth)

    const {data:orders, isLoading:myOrderLoading, error}=useGetMyOrdersQuery();
    useEffect(()=>{
       if (userInfo){
        setName(userInfo.name);
        setEmail(userInfo.email);

       } 
    },[userInfo.name, userInfo.email, userInfo])

    const submitHandler=async(e)=>{
        e.preventDefault();
       if(password !==confirmPassword){
        toast.error("Password do not match")
       }
       try {
        const res=await profile({
          _id:userInfo._id,
            name,
             email,
              password
        }).unwrap();
        dispatch(setCredential(res));
        toast.success("Profile updated successfully")
       } catch (error) {
        toast.error(error?.data?.message || error.error)
       }
    }
  return (
    
    <Row>
<Col md={3}>
    <h2>User Profile</h2>
    <Form onSubmit={submitHandler}>
<FormGroup controlId='name' className='my-2'>
    <FormLabel style={{fontWeight:"600"}}>Name</FormLabel>
    <FormControl type='name'style={{color:"black"}}
     placeholder='Enter name' value={name}
    onChange={(e)=>setName(e.target.value)}>

    </FormControl>
</FormGroup>

<FormGroup controlId='email' className='my-2'>
    <FormLabel style={{fontWeight:"600"}}>Email</FormLabel>
    <FormControl type='email'style={{color:"black"}}
     placeholder='Enter email' value={email}
    onChange={(e)=>setEmail(e.target.value)}>

    </FormControl>
</FormGroup>
<FormGroup controlId='password' className='my-2'>
    <FormLabel style={{fontWeight:"600"}}>Password</FormLabel>
    <FormControl    type='password'
    style={{color:"black"}}
     placeholder='Enter Password' value={password}
    onChange={(e)=>setPassword(e.target.value)}>
    </FormControl>
  
</FormGroup>

<FormGroup controlId='confirmPassword' className='my-2'>
    <FormLabel style={{fontWeight:"600"}}>Confirm Password</FormLabel>
    <FormControl 
     type="password"
    style={{color:"black"}}
     placeholder='Confirm Password' value={confirmPassword}
    onChange={(e)=>setConfirmedPassword(e.target.value)}>
    </FormControl>
   
</FormGroup>
<Button type='submit' variant='primary' className='my-2'>
Update
</Button>
{loadingUpdateProfile && <Loader/>}
    </Form>
    </Col>
<Col md={9}>
    <h2>My Orders</h2>
    {myOrderLoading? (<Loader/>):error?(<Message variant='danger'>
    {error?.data?.message}
    </Message>):(
        <Table striped bordered hover responsive
         className='table-sm' style={{backgroundColor:"white", color:"black"}}>
        <thead >
            <tr>
                <th style={{color:"green"}}>ID</th>
                <th style={{color:"green"}}>DATE</th>
                <th style={{color:"green"}}>TOTAL</th>
                <th style={{color:"green"}}>PAID</th>
                <th style={{color:"green"}}>DELIVERED</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
{orders.map((order)=>(
    <tr key={order._id}>
<td>{order._id}</td>
<td>{order.createdAt.substring(0, 10)}</td>
<td>${order.totalPrice}</td>

    </tr>
))}
        </tbody>
        </Table>
    )}
</Col>
    </Row>
  )
}

export default ProfileScreen
