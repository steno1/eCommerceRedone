import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGetSingleProductQuery, useUpdateProductMutation } from '../../slices/productApiSlice'

import FormContainer from '../../Components/formContainer'
import Loader from '../../Components/Loader'
import Message from '../../Components/Message'
import React from 'react'
import { toast } from 'react-toastify'

const ProductEditScreen = () => {
    const { id: productId } = useParams(); // Extract 'id' from URL parameters
    const [name, setName] = useState(""); // Initialize state variables
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState("");

    const { data: product, isLoading, error } = useGetSingleProductQuery(productId); // Fetch product data using a query

    const [updateProduct, { isLoading: LoadingUpdate }] = useUpdateProductMutation(); // Define a mutation for updating the product
    const navigate = useNavigate(); // Initialize a navigation function

    useEffect(() => { // Use an effect to populate form fields when product data is available
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const submitHandler = async (e) => { // Define a form submission handler
        e.preventDefault();
        const updatedProduct = { // Create an object with updated product data
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        };
        const result = await updateProduct(updatedProduct); // Send a mutation to update the product
        if (result.error) { // Handle potential errors
            toast.error(result.error);
        } else {
            toast.success('Product Updated');
            navigate("/admin/productlist"); // Navigate to a different route
        }
    }

    return ( // Render the component's JSX
        <>
        <Link to='/admin/productlist' className='btn btn-light my-3'> {/* Create a link back to the product list */}
        Go Back
        </Link>
        <FormContainer> {/* Render a container for the form */}
        <h1>Edit Product</h1>
        {LoadingUpdate && <Loader />} {/* Display a loading spinner during the update */}
        {isLoading ? (<Loader />) : error ? ( // Handle loading and error states
            <Message variant='danger'>{error.message}</Message>
        ) : (
            <Form onSubmit={submitHandler}> {/* Create a form for updating the product */}
            <FormGroup controlId='name' style={{ margin: "10px" }}>
            <FormLabel>Name</FormLabel>
            <FormControl type='text' placeholder='Enter name' // Render an input field for the product name
            value={name} style={{ color: "black" }}
            onChange={(e) => setName(e.target.value)}>
            </FormControl>
            </FormGroup>

            <FormGroup controlId='price' style={{ margin: "10px" }}>
            <FormLabel>Price</FormLabel>
            <FormControl type='number' placeholder='Price' // Render an input field for the product price
            value={price} style={{ color: "black" }}
            onChange={(e) => setPrice(e.target.value)}>
            </FormControl>
            </FormGroup>

            <FormGroup controlId='brand' style={{ margin: "10px" }}>
            <FormLabel>Brand</FormLabel>
            <FormControl type='text' placeholder='Enter Brand' // Render an input field for the product brand
            value={brand} style={{ color: "black" }}
            onChange={(e) => setBrand(e.target.value)}>
            </FormControl>
            </FormGroup>

            <FormGroup controlId='category' style={{ margin: "10px" }}>
            <FormLabel>Category</FormLabel>
            <FormControl type='text' placeholder='Enter category' // Render an input field for the product category
            value={category} style={{ color: "black" }}
            onChange={(e) => setCategory(e.target.value)}>
            </FormControl>
            </FormGroup>

            <FormGroup controlId='countInStock' style={{ margin: "10px" }}>
            <FormLabel>Counts in Stock (Products in Stock)</FormLabel>
            <FormControl type='number' placeholder='products in stock' // Render an input field for the product count in stock
            value={countInStock} style={{ color: "black" }}
            onChange={(e) => setCountInStock(e.target.value)}>
            </FormControl>
            </FormGroup>

            <FormGroup controlId='description' style={{ margin: "10px" }}> {/* Render a text area for the product description */}
            <FormLabel>Description</FormLabel>
            <textarea
                rows="5"
                placeholder="Product description"
                value={description}
                style={{ color: "black", width: "100%" }}
                onChange={(e) => setDescription(e.target.value)}>
            </textarea>
            </FormGroup>
            <Button type="submit" variant='primary' style={{ margin: "10px" }}> {/* Render a button to submit the form */}
            Update
            </Button>
            </Form>
        )}
        </FormContainer>
        </>
    )
}

export default ProductEditScreen // Export the component
