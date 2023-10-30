// Import necessary components and libraries from various sources

import { Button, Table } from 'react-bootstrap'; // Import components from the 'react-bootstrap' library

import { FaTimes } from 'react-icons/fa'; // Import the 'FaTimes' icon from 'react-icons'
import { LinkContainer } from 'react-router-bootstrap'; // Import the 'LinkContainer' component from 'react-router-bootstrap'
import Loader from '../../Components/Loader'; // Import the 'Loader' component from a relative path
import Message from '../../Components/Message'; // Import the 'Message' component from a relative path
import React from 'react'; // Import the 'React' object from the 'react' library
import { useGetOrdersQuery } from '../../slices/OrderApiSlice'; // Import the 'useGetOrdersQuery' function from a relative path

// Define a functional component named 'OrderListScreen'
const OrderListScreen = () => {
  // Destructure values from the result of 'useGetOrdersQuery'
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {/* Start of the JSX for the component */}
      <h1>Orders</h1> {/* Display a heading "Orders" */}
      {isLoading ? ( // Check if data is loading
        <Loader /> // Display a loader component if loading
      ) : error ? ( // Check if there is an error
        <Message variant="danger">{error.message}</Message> // Display an error message in a red variant
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>USERS</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  order.paidAt
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.isDeliveredAt
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant='light' className='btn-sm'>
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      )}
    </>
  );
};

export default OrderListScreen; // Export the 'OrderListScreen' component
