import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import React from 'react';

const Product = ({product}) => {
  return (
    <Card 
    style={{
        width: '18rem',
        backgroundColor: '#F2EE9D',
        border: '1px solid #cf5353',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px', // Add margin to separate the cards
        margin:"10px",
        color:"#557A46",
        fontWeight:"600"

      }}
    
    >
      <Link to={`/product/${product._id}`}>
      <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
      <Link to={`/product/${product._id}`}>
        <Card.Title as='div'className='product-title'>
        <strong>{product.name}</strong>
        </Card.Title>
        </Link>
        <Card.Text as="h3">
        ₦{product.price}
        </Card.Text>
        <Card.Text as="div">
        <Rating value={product.rating} text={`${product.numReviews} Reviews`}
       />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product;
