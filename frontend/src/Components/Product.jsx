import Card from 'react-bootstrap/Card';
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
        margin:"10px"
      }}
    
    >
      <a href={`/product/${product._id}`}>
      <Card.Img variant="top" src={product.image} />
      </a>
      <Card.Body>
      <a href={`/product/${product._id}`}>
        <Card.Title as='div'>
        <strong>{product.name}</strong>
        </Card.Title>
        </a>
        <Card.Text as="h3">
        ₦{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product;
