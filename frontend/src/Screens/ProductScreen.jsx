import { Image, ListGroupItem } from 'react-bootstrap';
import React, { useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../Components/Rating';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { useState } from 'react';

const ProductScreen = () => {
  const [product, setProduct]=useState([])
    const {id:productId}=useParams();
   useEffect(()=>{
    const fetchProduct=async()=>{
      try {
     const {data}=await axios.get(`/api/products/${productId}`)
        if(data){
     setProduct(data)
        }
      } catch (error) {
       console.log(`Error fetching product: ${error}`) 
      }

    };
    fetchProduct();

   },[productId])
  return (
    <>
   <Link className='btn btn-light my-3' to="/">
   Go Back
   </Link>
    <Row>
    <Col md={5}>
        <Image src={product.image} alt={product.name} fluid/>
     
    </Col>
    <Col md={4}>
    <ListGroup variant='flush'>
        <ListGroup.Item >
          <h3>{product.name}</h3>
        </ListGroup.Item>
        <ListGroup.Item >
          <Rating value={product.rating} text={`${product.numReviews} Reviews`}/>
        </ListGroup.Item>
        <ListGroup.Item >
       <p style={{backgroundColor:"#004225", color:"white", padding:"8px"}}>{product.description}</p> 
        </ListGroup.Item>
      </ListGroup>
      
    </Col>

    <Col md={3}>
    <Card >
      <ListGroup variant='flush'>
<ListGroupItem>
<Row>
<Col>Price:</Col>
<Col><strong> ₦{product.price}</strong></Col>
</Row>

</ListGroupItem>

<ListGroupItem>
<Row>
<Col>Status:</Col>
<Col><strong> {product.countInStock>0?"In Stock":"Out of Stock"}
</strong></Col>
</Row>

</ListGroupItem>
<ListGroupItem>
<Button variant="success" style={{color:"white", fontSize:"16px"}}
 disabled={product.countInStock===0}>
    Add To Cart
</Button>
</ListGroupItem>

   </ListGroup>
    </Card>
    </Col>
  </Row>
  </>
  )
}

export default ProductScreen