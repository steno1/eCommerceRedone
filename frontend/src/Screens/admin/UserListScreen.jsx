// Import necessary components and libraries from various sources

import { Button, Col, Row, Table } from 'react-bootstrap'; // Import components from the 'react-bootstrap' library
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'; // Import the 'FaTimes' icon from 'react-icons'

import { LinkContainer } from 'react-router-bootstrap'; // Import the 'LinkContainer' component from 'react-router-bootstrap'
import Loader from '../../Components/Loader'; // Import the 'Loader' component from a relative path
import Message from '../../Components/Message'; // Import the 'Message' component from a relative path
import React from 'react'; // Import the 'React' object from the 'react' library
import { toast } from "react-toastify"; // Import the 'toast' function from 'react-toastify'
import { useGetUsersQuery } from '../../slices/userApiSlice';

const UserListScreen = () => {
   
    const { data: users, isLoading, error, refetch } = useGetUsersQuery();
console.log(users)

   // Handler for deleting a user
   const deleteHandler = async(id) => {
   console.log("delete user")
  }

    // Render the component's JSX.
    return (
        <>
        <h1>Users</h1>

     {/* Conditional rendering based on loading and error states. */}
            {isLoading ? (
            <Loader/>
            ) : error ?(
            <Message>{error.message}</Message> ): (
                <>
                    {/* Display a table for listing users. */}
   <Table striped bordered responsive hover className='table-sm'>
                        <thead>
                            <tr>
        <td style={{ color: "black", fontWeight: "700" }}>ID</td>
         <td style={{ color: "black", fontWeight: "700" }}>NAME</td>
        <td style={{ color: "black", fontWeight: "700" }}>EMAIL</td>
        <td style={{ color: "black", fontWeight: "700" }}>ADMIN</td>

       <td style={{ color: "black", fontWeight: "700" }}></td>
                            </tr>
                        </thead>
                        <tbody>
       {/* Map through the users and display them in rows. */}
         {users.map((user) => (
           <tr key={user._id}>
        <td style={{ color: "black" }}>{user._id}</td>
         <td style={{ color: "black" }}>{user.name}</td>
          <td style={{ color: "black" }}>
            <a href={`mailto:${user.email}`}>{user.email}</a>
            </td>
            <td style={{ color: "black" }}>
                {user.isAdmin?(
                    <FaCheck style={{color:"green"}}/>
                ):(
                  <FaTimes style={{color:"red"}}/>  
                )}
    
            </td>
        

             <td style={{ color: "black" }}>
           <LinkContainer to={`/admin/user/${user._id}/edit`}>
              <Button variant='light' className='btn-sm mx-2'>
                     <FaEdit />Edit
                      </Button>
                   </LinkContainer>
       <Button variant="danger" className='btn-sm'
        style={{ color: "white" }} 
        onClick={() => deleteHandler(user._id)}


        >
                                   <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    );
}

// Export the 'ProductListScreen' component as the default export.
export default UserListScreen;
