import {
    Button,
    Form,
    FormCheck,
    FormControl,
    FormGroup,
    FormLabel
} from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
     useGetUserDetailsQuery,
     useUpdateUserMutation
} from '../../slices/userApiSlice'

import FormContainer from '../../Components/formContainer'
import Loader from '../../Components/Loader'
import Message from '../../Components/Message'
import React from 'react'
import { toast } from 'react-toastify'

const  UserEditScreen = () => {
    // Extract 'id' from URL parameters
    const { id: userId } = useParams();

    // Initialize state variables for various user details
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin]=useState(false)
   
    

    // Initialize a navigation function for redirecting to other routes
    const navigate = useNavigate();
const {data:user, isLoading, refetch, error}=useGetUserDetailsQuery(userId);

const [updateUser, {isLoading:updateLoading}]=useUpdateUserMutation();
    // Use an effect to populate form fields when product data is available
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin)
           
        }
    }, [user]);

    // Define a form submission handler
    const submitHandler = async (e) => {
        e.preventDefault();
        if(user){
try {
    await updateUser({
        userId, 
        name,
         email,
         isAdmin});
    toast.success("User updated successfully");
    refetch();
    navigate("/admin/userlist")
} catch (error) {
    toast.error(error?.data?.message || error.error)
}
        }
           
    
    }


    return (
        <>
            {/* Create a link back to the product list */}
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            {/* Render a container for the form */}
            <FormContainer>
                <h1>Edit User</h1>
            
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    // Handle loading and error states
                    <Message variant='danger'>{error.message}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        {/* Render input fields and form controls for updating product details */}
                        <FormGroup controlId='name' style={{ margin: "10px" }}>
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter name'
                                value={name}
                                style={{ color: "black" }}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='email' style={{ margin: "10px" }}>
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                type='email'
                                placeholder='Enter your email'
                               value={email} 
                               onChange={(e)=>setEmail(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='isAdmin' className='my-2'>
                                    <FormCheck
                                    type="checkbox"
                                    label="is Admin"
                                    checked={isAdmin}
                          onChange={(e)=>setIsAdmin(e.target.value)}>
                        

                                    </FormCheck>

                        </FormGroup>
                        
                    
                        <Button type="submit" variant='primary' 
                        style={{ margin: "10px" }}>
                            Update
                        </Button>
                        {updateLoading && <Loader />}
                    </Form>
                )}
            </FormContainer>
        </>
    );
}

export default  UserEditScreen;

