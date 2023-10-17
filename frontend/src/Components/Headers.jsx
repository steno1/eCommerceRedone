import { FaShoppingCart, FaUser } from "react-icons/fa";

import { Badge } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { LinkContainer } from "react-router-bootstrap";
import Logo from "../assets/STENOMARKETLOGO.jpg";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector } from "react-redux/es/hooks/useSelector";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    console.log("logout");
  }

  const expand = 'md';

  return (
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
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

      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={Logo} alt="Logo" className="Logo" />
            Steno Market
          </Navbar.Brand>
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
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && <Badge pill bg="success" style={{ marginLeft: "5px" }} >
                    {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                  </Badge>}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown style={{marginBottom:"10px"}}
                  title={userInfo.name}
                  id="username"
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser />Sign In
                    </Nav.Link>
                </LinkContainer>
              )}

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
