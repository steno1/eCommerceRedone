import { Badge, NavbarCollapse } from "react-bootstrap"; // Importing Badge component from react-bootstrap
import { FaShoppingCart, FaUser } from "react-icons/fa"; // Importing specific icons from the react-icons library

import Container from 'react-bootstrap/Container'; // Importing Container component from react-bootstrap
import { LinkContainer } from "react-router-bootstrap"; // Importing LinkContainer component from react-router-bootstrap
import Logo from "../assets/STENOMARKETLOGO.jpg"; // Importing an image asset
import Nav from 'react-bootstrap/Nav'; // Importing Nav component from react-bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown'; // Importing NavDropdown component from react-bootstrap
import Navbar from 'react-bootstrap/Navbar'; // Importing Navbar component from react-bootstrap
import SearchBox from "./SearchBox";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useLogoutApiCallMutation } from "../slices/userApiSlice";
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"; // Importing the useSelector hook from react-redux

function Header() {
  const { cartItems } = useSelector((state) => state.cart); // Using useSelector to get cartItems from Redux store
  const { userInfo } = useSelector((state) => state.auth); // Using useSelector to get userInfo from Redux store

const navigate=useNavigate();
const dispatch=useDispatch();

const [logoutApiCall]=useLogoutApiCallMutation();
  const logoutHandler = async() => {
   try {
    await logoutApiCall().unwrap();
    dispatch(logout());
    dispatch(resetCart());
    navigate("/login");
   } catch (error) {
    console.log(error);
   }
  }

  return (
    <header>
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect> 
      {/* Navbar component with specific props */}
      <style>
        {`
          .custom-navbar {
            background-color: #343a40;
          }
          .custom-navbar .navbar-brand,
          .custom-navbar .nav-link {
            color: #ffffff !important;
          }
          .custom-navbar .navbar-toggler-icon,
          .custom-navbar .navbar-toggler-icon:focus {
            background-color: #ffffff;
            border-radius: 4px;
          }
          .custom-navbar .navbar-toggler:focus {
            outline: none;
          }
        `}
      </style>

      <Container >
        {/* Container component */}
        <LinkContainer to="/">
          {/* LinkContainer component with a link to the root route */}
          <Navbar.Brand>
            {/* Navbar.Brand component */}
            <img src={Logo} alt="Logo" className="Logo" />
            {/* An image element */}
            Steno Market
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        {/* Navbar.Toggle component */}
       <NavbarCollapse id = 'basic-navbar-nav'>
          <Nav className="ms-auto">
          <SearchBox/>
          <LinkContainer to="/cart">
                {/* LinkContainer component with a link to the cart route */}
                <Nav.Link>
                  {/* Nav.Link component */}
                  <FaShoppingCart /> Cart
                  {/* FontAwesome icon and text */}
                  {cartItems.length > 0 && <Badge pill bg="success" style={{ marginLeft: "5px" }} >
                    {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                  </Badge>}
                  {/* Conditional rendering of a Badge component */}
                </Nav.Link>
              </LinkContainer>
              
              {userInfo ? (
                // Conditional rendering based on the userInfo
                <NavDropdown style={{marginBottom:"10px"}}
                  title={userInfo.name}
                  id="username"
                >
                  {/* NavDropdown component */}
                  <LinkContainer to='/profile'>
                    {/* LinkContainer component with a link to the profile route */}
                    <NavDropdown.Item >
                      {/* NavDropdown.Item component */}
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  {/* Divider */}
                  <NavDropdown.Item onClick={logoutHandler}>
                    {/* NavDropdown.Item component with a click handler */}
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // Else block for when userInfo is not available
                <LinkContainer to="/login">
                  {/* LinkContainer component with a link to the login route */}
                  <Nav.Link>
                    {/* Nav.Link component */}
                    <FaUser />Sign In
                    {/* FontAwesome icon and text */}
                    </Nav.Link>
                </LinkContainer>
              )}
         
             {/* admin link*/}
{userInfo && userInfo.isAdmin && (
  <NavDropdown title='Admin' id="adminmenu">
     <LinkContainer to='/admin/productlist' >
<NavDropdown.Item>Products</NavDropdown.Item>
  
    </LinkContainer>
    <NavDropdown.Divider />
     <LinkContainer to='/admin/orderlist' >
<NavDropdown.Item>Orders</NavDropdown.Item>
    </LinkContainer>
    <NavDropdown.Divider />
    <LinkContainer to='/admin/userlist' >
<NavDropdown.Item>Users</NavDropdown.Item>
    </LinkContainer>

  </NavDropdown>
)}
            </Nav>
            
       </NavbarCollapse>
          
      </Container>
    </Navbar>
    </header>
  );
}

export default Header;
