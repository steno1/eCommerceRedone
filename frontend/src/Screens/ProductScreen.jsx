// Importing necessary components and hooks from external libraries and local files

import {
    FormControl,
    FormGroup,
    FormLabel,
    Image,
    ListGroupItem,
} from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Rating from '../Components/Rating';
import Row from 'react-bootstrap/Row';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import { useCreateReviewMutation } from '../slices/productApiSlice';
import { useDispatch } from 'react-redux';
import { useGetSingleProductQuery } from '../slices/productApiSlice';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const ProductScreen = () => {
      // Extracting 'id' from the URL params and fetching product data based on 'id'
      const {id:productId} = useParams(); // Extracting 'id' from the URL params
      const dispatch = useDispatch(); // Accessing the dispatch function from Redux
      const navigate = useNavigate(); // Accessing the navigate function from React Router
  
      const [qty, setQty] = useState(1); // Creating a state variable 'qty' and a function to update it
        const [rating, setRating]=useState(0);
        const [comment, setComment]=useState("")


      // Fetching product data based on 'id' using a query from 'productApiSlice'
      const {data: product, isLoading, error, refetch} = useGetSingleProductQuery(productId);
  
const [createReview, {isLoading:loadingProductReview}]=useCreateReviewMutation();
const {userInfo}=useSelector((state)=>state.auth);

      // Function to handle adding the product to the cart
      const addToCartHandler = () => {
          dispatch(addToCart({ // Dispatching the 'addToCart' action with the product and quantity
              ...product, // Spreading the properties of 'product' object
              qty // Including the quantity
          }));
          navigate("/cart"); // Navigating to the '/cart' route after adding to the cart
      }
  const submitHandler=async(e)=>{
e.preventDefault();
try {
   await createReview({
    productId,
    rating, 
    comment
   }).unwrap();
   refetch();
   toast.success('Review Submitted Successfully');
   setRating(0);
   setComment("")
} catch (error) {
    toast.error(error?.data?.message || error.error)
}

  }

      return (
          <>
            {/* Link to go back to the homepage */}
              <Link className='btn btn-light my-3' to="/">
                  Go Back
              </Link>
              
              {/* Conditional rendering based on loading and error states */}
              {isLoading ? (
                  <Loader/> // Displaying a loader if data is loading
              ) : error ? (
                  <Message variant="danger">
                      {error?.data?.message || error.error} {/* Displaying an error message */}
                  </Message>
              ) : (
                <>
                  {/*Render product details */} 
                  <Row>
                      <Col md={5}>
                          {/* Display product image */}
                     <Image src={product.image} alt={product.name}  style={{color:"black"}}
                           fluid/>
                      </Col>
                      <Col md={4}>
                          <ListGroup variant='flush'>
                              <ListGroup.Item style={{color:"black"}}>
                                  {/* Display product name */}
                                  <h3  >{product.name}</h3>
                              </ListGroup.Item>
                              <ListGroup.Item  style={{color:"black"}} >
                                  {/* Display product rating and review count */}
            <Rating value={product.rating} text={`${product.numReviews} 
             Reviews`} />
                              </ListGroup.Item>
                              <ListGroup.Item >
                                  {/* Display product description */}
                                  <p style={{backgroundColor:"#004225", color:"white", padding:"8px"}}>
                                      {product.description}
                                  </p> 
                              </ListGroup.Item>
                          </ListGroup>
                      </Col>
                      <Col md={3}>
                          <Card >
                              <ListGroup variant='flush'>
                                  {/* Display product price */}
                                  <ListGroup.Item>
                                      <Row>
                                          <Col style={{color:"black"}}>Price:</Col>
                   <Col><strong> ${product.price}</strong></Col>
                                      </Row>
                                  </ListGroup.Item>
                                  {/* Display product availability status */}
                                  <ListGroup.Item>
                                      <Row>
                                          <Col  style={{color:"black"}}>Status:</Col>
                              <Col><strong> {product.countInStock >
                       0 ? "In Stock" : "Out of Stock"}</strong></Col>
                                      </Row>
                                  </ListGroup.Item>
                     {product.countInStock > 0 && (
                             <ListGroup.Item>
                                 <Row>
                                  <Col  style={{color:"black"}}>Quantity</Col>
                                     <Form>
                 <FormControl as="select" value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}>
                       {[...Array(product.countInStock).keys()].map((x) => (
                     <option key={x+1} value={x+1} 
                     style={{backgroundColor:"black", color:"white"}}>
                              {x+1}
                              </option>
                                   ))}
                                 </FormControl>
                                              </Form>
                                          </Row>
                                      </ListGroup.Item>
                                  )}
                 {/* Button to add product to cart */}
                    <ListGroup.Item>
            <Button variant="success" 
            style={{color:"white", fontSize:"16px"}}
             disabled={product.countInStock === 0}
              onClick={addToCartHandler}>
                                          Add To Cart
                                      </Button>
                                  </ListGroup.Item>
                              </ListGroup>
                          </Card>
                      </Col>
                  </Row>
                  <Row className='review'>
<Col md={6}>
    <h2>Review</h2>
    {product.reviews.length===0 &&
     <Message >No Reviews for this Product</Message>}

<ListGroup variant='flush'>
{product.reviews.map((review)=>(
    <ListGroupItem key={review._id}>
<strong>{review.name}</strong>
<Rating value={review.rating} />
<p>{review.createdAt.substring(0, 10)}</p>
<p>{review.comment}</p>

    </ListGroupItem>
))}
<ListGroupItem>
<h4  style={{color:"black"}}>Write a Customer Review</h4>
{loadingProductReview && <Loader/>}
{userInfo ? (
    <Form onSubmit={submitHandler}>
<FormGroup controlId='rating' className='my-2'>
<FormLabel  style={{color:"black"}}>Rating</FormLabel>
<FormControl as='select' value={rating}  style={{color:"black"}}
 onChange={(e)=>setRating(Number(e.target.value))}>
<option value='' style={{color:"black"}}> Select...</option>
<option value='1' style={{color:"black"}}> 1 - Poor</option>
<option value='2' style={{color:"black"}}> 2 - Fair</option>
<option value='3' style={{color:"black"}}> 3 - Good</option>
<option value='4' style={{color:"black"}}> 4 - Very Good</option>
<option value='5' style={{color:"black"}}> 5 - Excellent</option>

</FormControl>
</FormGroup>
<FormGroup controlId='comment' className='my-2' style={{color:"black"}}>
<FormLabel>Comment</FormLabel>
<FormControl as='textarea' row='3' value={comment} style={{color:"black"}}
onChange={(e)=>setComment(e.target.value)}>

</FormControl>
</FormGroup>
<Button disabled={loadingProductReview}
type='submit' variant='primary'>
Submit
</Button>
    </Form>
):(
   <Message>Please <Link to="/login">Sign In</Link> to write a review</Message>
)}

</ListGroupItem>

</ListGroup>
</Col>
                  </Row>
                  </>
              )}
          </>
      )
  }
  
  export default ProductScreen;
  