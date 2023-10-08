import {FaShoppingCart, FaUser} from "react-icons/fa"

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {LinkContainer} from "react-router-bootstrap"
import Logo from "../assets/STENOMARKETLOGO.jpg"
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Header() {
  const expand = 'md'; 

  return (
    <Navbar  expand={expand} className="custom-navbar"
     >
 <style>
        {`
          .custom-navbar {
            background-color: #343a40; /* Dark background color */
          }
          .custom-navbar .navbar-brand,
          .custom-navbar .nav-link {
            color: #ffffff !important; /* White text color */
          }
          .custom-navbar .navbar-toggler-icon,
          .custom-navbar .navbar-toggler-icon:focus {
            background-color: #ffffff; /* White color for toggle icon */
            
            border-radius: 4px; /* Optional: Add border radius */
          }
          .custom-navbar .navbar-toggler:focus {
            outline: none; /* Remove outline when toggled */
          }
        `}
      </style>

      <Container fluid>
        <LinkContainer to="/">
        <Navbar.Brand>
            <img src={Logo} alt="Logo" className="Logo"/>
            Steno Market</Navbar.Brand>
        </LinkContainer>
       
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Steno Market
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <LinkContainer to="/cart">
              <Nav.Link><FaShoppingCart/> Cart</Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/login">
              <Nav.Link><FaUser/>Login</Nav.Link>
              </LinkContainer>
              <NavDropdown
                title="Dropdown"
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
