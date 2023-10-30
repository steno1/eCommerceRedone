import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGetSingleProductQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../slices/productApiSlice'

import FormContainer from '../../Components/formContainer'
import Loader from '../../Components/Loader'
import Message from '../../Components/Message'
import React from 'react'
import { toast } from 'react-toastify'

const ProductEditScreen = () => {
    // Extract 'id' from URL parameters
    const { id: productId } = useParams();

    // Initialize state variables for various product details
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState("");

    // Fetch product data using a query
    const { data: product, isLoading, error } = useGetSingleProductQuery(productId);

    // Define a mutation function for updating the product
    const [updateProduct, { isLoading: LoadingUpdate }] = useUpdateProductMutation();

    // Initialize a navigation function for redirecting to other routes
    const navigate = useNavigate();

    // Define a mutation function for uploading product images
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    // Use an effect to populate form fields when product data is available
    useEffect(() => {
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

    // Define a form submission handler
    const submitHandler = async (e) => {
        e.preventDefault();
        // Create an object with updated product data
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        };
        // Send a mutation to update the product
        const result = await updateProduct(updatedProduct);
        // Handle potential errors or display a success message
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Product Updated');
            // Navigate to a different route
            navigate("/admin/productlist");
        }
    }

    // Define a function to handle file uploads for the product image
    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {
            // Call the uploadProductImage mutation and await the response
            const res = await uploadProductImage(formData).unwrap();
            // Display a success message using the toast library
            toast.success(res.message);
            // Update the image state with the new image URL
            setImage(res.image);
        } catch (error) {
            // Display an error message using the toast library
            toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <>
            {/* Create a link back to the product list */}
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            {/* Render a container for the form */}
            <FormContainer>
                <h1>Edit Product</h1>
                {/* Display a loading spinner during the update */}
                {LoadingUpdate && <Loader />}
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
                        <FormGroup controlId='price' style={{ margin: "10px" }}>
                            <FormLabel>Price</FormLabel>
                            <FormControl
                                type='number'
                                placeholder='Price'
                                value={price}
                                style={{ color: "black" }}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='image' style={{ margin: "10px" }}>
                            <FormLabel>Image</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </FormControl>
                            <FormControl
                                type='file'
                                label="Choose File"
                                onChange={uploadFileHandler}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='brand' style={{ margin: "10px" }}>
                            <FormLabel>Brand</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter Brand'
                                value={brand}
                                style={{ color: "black" }}
                                onChange={(e) => setBrand(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='category' style={{ margin: "10px" }}>
                            <FormLabel>Category</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                style={{ color: "black" }}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='countInStock' style={{ margin: "10px" }}>
                            <FormLabel>Counts in Stock (Products in Stock)</FormLabel>
                            <FormControl
                                type='number'
                                placeholder='products in stock'
                                value={countInStock}
                                style={{ color: "black" }}
                                onChange={(e) => setCountInStock(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='description' style={{ margin: "10px" }}>
                            <FormLabel>Description</FormLabel>
                            <textarea
                                rows="5"
                                placeholder="Product description"
                                value={description}
                                style={{ color: "black", width: "100%" }}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                        </FormGroup>
                        <Button type="submit" variant='primary' style={{ margin: "10px" }}>
                            Update
                        </Button>
                        {loadingUpload && <Loader />}
                    </Form>
                )}
            </FormContainer>
        </>
    );
}

export default ProductEditScreen;
