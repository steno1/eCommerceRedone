// Import necessary components and libraries from various sources

import { Button, Table } from 'react-bootstrap'; // Import components from the 'react-bootstrap' library
import { useDispatch, useSelector } from 'react-redux'; // Import 'useDispatch' and 'useSelector' from 'react-redux'

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
        <Message variant="danger">{error.Message}</Message> // Display an error message in a red variant
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          {/* Display a responsive table with some styling */}
          <thead>
            <tr>
              {/* Table header row */}
              <th>ID</th> {/* Table column for order ID */}
              <th>USERS</th> {/* Table column for user name */}
              <th>DATE</th> {/* Table column for order date */}
              <th>TOTAL</th> {/* Table column for order total price */}
              <th>PAID</th> {/* Table column for payment status */}
              <th>DELIVERED</th> {/* Table column for delivery status */}
              <th></th> {/* Empty table column for action buttons */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              // Map through the 'orders' array and generate rows for each order
              <tr key={order._id}>
                {/* Set a unique 'key' for each row */}
                <td>{order._id}</td> {/* Display the order ID */}
                <td>{order.user && order.user.name}</td>
                {/* Display the user's name if available in the order object */}
                <td>{order.createdAt.substring(0, 10)}</td>
                {/* Display the first 10 characters of the order creation date */}
                <td>${order.totalPrice}</td> {/* Display the total price */}
                <td>
                  {order.isPaid ? (
                    // Check if the order is paid
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    // Check if the order is delivered
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {/* Display a button for viewing order details */}
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
