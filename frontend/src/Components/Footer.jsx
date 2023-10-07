import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Footer() {
    const currentYear=new Date().getFullYear();
  return (
    <footer>
  <Container>
      <Row>
        
        <Col className='text-center py-3'>
        <p>StenoMarket © {currentYear}</p>
        </Col>
      </Row>
    </Container>

    </footer>
  
  );
}

export default Footer;