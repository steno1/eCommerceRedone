import { Carousel, Image } from 'react-bootstrap' // Importing Carousel and Image components from 'react-bootstrap' library.

import { Link } from 'react-router-dom' // Importing the Link component from 'react-router-dom' library.
import Loader from './Loader' // Importing the Loader component from a local file.
import Message from './Message' // Importing the Message component from a local file.
import React from 'react' // Importing the React library.
import { useGetTopProductsQuery } from '../slices/productApiSlice' // Importing a custom hook for fetching top products from 'productApiSlice'.

const ProductCarousel = () => { // Defining a functional React component named 'ProductCarousel'.
    // Use the useGetTopProductsQuery hook to fetch top products and manage loading and error states.
    const { data: products, isLoading, error } = useGetTopProductsQuery(); // Using the 'useGetTopProductsQuery' hook to fetch data.

    return (
        <> {/* An empty React fragment used to wrap multiple JSX elements. */}
            {isLoading ? ( // Conditional rendering based on the 'isLoading' state.
                // Display a Loader component while data is loading.
                <Loader />
            ) : error ? ( // Conditional rendering based on the 'error' state.
                // Display an error message if there's an error.
                <Message variant="danger">{error.message}</Message>
            ) : (
                // If data is loaded successfully and there's no error, render the Carousel component.
                <Carousel pause='hover' className='bg-primary mb-4'>
                    {products.map((product) => ( // Mapping through the 'products' array.
                        <Carousel.Item key={product._id}> {/* Creating a carousel item with a unique key. */}
                            <Link to={`/product/${product._id}`}> {/* Creating a link to a product page. */}
                                <Image src={product.image} alt={product.name} fluid 
                                style={{objectFit:"cover", marginBottom:"100px"}}/> {/* Displaying an image with specific styles. */}
                                <Carousel.Caption className='carousel-caption'>
                                    <h2>{product.name} (${product.price})</h2> {/* Displaying product name and price. */}
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </>
    );
}

export default ProductCarousel; // Exporting the 'ProductCarousel' component as the default export.
