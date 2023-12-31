// Import necessary components and libraries from various sources

import { Button, Col, Row, Table } from 'react-bootstrap'; // Import components from the 'react-bootstrap' library
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import the 'FaTimes' icon from 'react-icons'
import { useCreateProductMutation, useDeleteProductMutation } from '../../slices/productApiSlice'; // Import the 'useCreateProductMutation' function from the 'productApiSlice'

import { LinkContainer } from 'react-router-bootstrap'; // Import the 'LinkContainer' component from 'react-router-bootstrap'
import Loader from '../../Components/Loader'; // Import the 'Loader' component from a relative path
import Message from '../../Components/Message'; // Import the 'Message' component from a relative path
import Paginate from '../../Components/Paginate';
import React from 'react'; // Import the 'React' object from the 'react' library
import { toast } from "react-toastify"; // Import the 'toast' function from 'react-toastify'
import { useGetProductsQuery } from '../../slices/productApiSlice'; // Import the 'useGetProductsQuery' function from the 'productApiSlice'
import { useParams } from 'react-router-dom';

// Define a React functional component named 'ProductListScreen'.
const ProductListScreen = () => {
     const {pageNumber}=useParams();
    // Use the 'useGetProductsQuery' hook to query products data from the API.
    const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});

   
    // Use the 'useCreateProductMutation' hook to create a new product.
    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const [deleteProduct, {isLoading:loadingDelete}]=useDeleteProductMutation();

   // Handler for deleting a product
   const deleteHandler = async(id) => {
    if(window.confirm("Are sure you want to delete the product?")){
try {
  await deleteProduct(id);
  toast.success("Product deleted")
  refetch();
} catch (err) {
  toast.error(err?.data?.message || err.error)
}
    }
  }

    // Define a function to handle the creation of a new product.
    const createProductHandler = async () => {
        // Show a confirmation dialog to the user.
        if (window.confirm("Are you sure you want to create a new product?")) {
            try {
                // Call the 'createProduct' mutation function to create a new product.
                await createProduct();
                // Refetch the product data to update the list.
                refetch();
            } catch (error) {
                // Display an error message using the 'toast' function.
                toast.error(error?.data?.message || error.error);
            }
        }
    }

    // Render the component's JSX.
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
       <Button className='btn-sm m-3' onClick={createProductHandler}>
                        <FaEdit />Create Product
                    </Button>
                </Col>
            </Row>
            
            {/* Display a loader if a new product is being created. */}
            {loadingCreate && (<Loader />)}
            {loadingDelete && (<Loader/>)}

            {/* Conditional rendering based on loading and error states. */}
            {isLoading ? (<Loader/>) : error ? <Message>{error?.data?.message}</Message> : (
                <>
                    {/* Display a table for listing products. */}
   <Table striped bordered responsive hover className='table-sm'>
                        <thead>
                            <tr>
        <td style={{ color: "black", fontWeight: "700" }}>ID</td>
         <td style={{ color: "black", fontWeight: "700" }}>NAME</td>
        <td style={{ color: "black", fontWeight: "700" }}>PRICE</td>
        <td style={{ color: "black", fontWeight: "700" }}>CATEGORY</td>
        <td style={{ color: "black", fontWeight: "700" }}>BRAND</td>
       <td style={{ color: "black", fontWeight: "700" }}></td>
                            </tr>
                        </thead>
                        <tbody>
       {/* Map through the products and display them in rows. */}
         {data.products.map((product) => (
           <tr key={product._id}>
        <td style={{ color: "black" }}>{product._id}</td>
         <td style={{ color: "black" }}>{product.name}</td>
          <td style={{ color: "black" }}>${product.price}</td>
          <td style={{ color: "black" }}>{product.category}</td>
           <td style={{ color: "black" }}>{product.brand}</td>
             <td style={{ color: "black" }}>
           <LinkContainer to={`/admin/product/${product._id}/edit`}>
              <Button variant='light' className='btn-sm mx-2'>
                     <FaEdit />
                      </Button>
                   </LinkContainer>
       <Button variant="danger" className='btn-sm'
        style={{ color: "white" }} 
        onClick={() => deleteHandler(product._id)}


        >
                                   <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={data.pages} page={data.page}
                    isAdmin={true}/>
                </>
            )}
        </>
    );
}

// Export the 'ProductListScreen' component as the default export.
export default ProductListScreen;
