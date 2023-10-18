// Importing necessary components from external libraries

import { LinkContainer } from 'react-router-bootstrap'
import { Nav } from 'react-bootstrap'
import React from 'react'

// Defining a functional component named CheckoutStep with destructured props
const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      {/* Creating a navigation bar with centered content and margin-bottom of 4 */}
      <Nav className="justify-content-center mb-4" activeKey="/home">
        {/* Navigation Item for Step 1 */}
        <Nav.Item>
            {/* Checking if step1 is true */}
            {step1 ? (
               // If true, creating a LinkContainer to '/login'
               <LinkContainer to="/login">
                {/* Rendering a clickable Nav.Link with inline style */}
                <Nav.Link style><h6>Sign In</h6></Nav.Link>
               </LinkContainer> 
            ) : (
                // If step1 is false, rendering a disabled Nav.Link
                <Nav.Link disabled>
                <h6>Sign In</h6>
              </Nav.Link>  
            )}
        </Nav.Item>

        {/* Navigation Item for Step 2 */}
        <Nav.Item>
            {/* Checking if step2 is true */}
            {step2 ? (
               // If true, creating a LinkContainer to '/shipping'
               <LinkContainer to="/shipping">
                {/* Rendering a clickable Nav.Link with inline style */}
                <Nav.Link style><h6>Shipping</h6></Nav.Link>
               </LinkContainer> 
            ) : (
                // If step2 is false, rendering a disabled Nav.Link
                <Nav.Link disabled>
                <h6>Shipping</h6>
              </Nav.Link>  
            )}
        </Nav.Item>

        {/* Navigation Item for Step 3 */}
        <Nav.Item>
            {/* Checking if step3 is true */}
            {step3 ? (
               // If true, creating a LinkContainer to '/payment'
               <LinkContainer to="/payment">
                {/* Rendering a clickable Nav.Link with inline style */}
                <Nav.Link style><h6>Payment</h6></Nav.Link>
               </LinkContainer> 
            ) : (
                // If step3 is false, rendering a disabled Nav.Link
                <Nav.Link disabled>
                <h6>Payment</h6>
              </Nav.Link>  
            )}
        </Nav.Item>

        {/* Navigation Item for Step 4 */}
        <Nav.Item>
            {/* Checking if step4 is true */}
            {step4 ? (
               // If true, creating a LinkContainer to '/placeorder'
               <LinkContainer to="/placeorder">
                {/* Rendering a clickable Nav.Link with inline style */}
                <Nav.Link style><h6>Place Order</h6></Nav.Link>
               </LinkContainer> 
            ) : (
                // If step4 is false, rendering a disabled Nav.Link
                <Nav.Link disabled>
                <h6>Place Order</h6>
              </Nav.Link>  
            )}
        </Nav.Item>

      </Nav>
    </>
  )
}

// Exporting the CheckoutStep component as the default export of this module
export default CheckoutStep
