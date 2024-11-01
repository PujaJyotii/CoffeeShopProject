import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Headings.module.css";
import { useSelector } from "react-redux";

function Headings(props) {
  const cart = useSelector((state) => state.cart.cart);
  let totalAmount = cart.reduce((total, item) => total + item.amount, 0);
  return (
    <>
      <Navbar data-bs-theme="dark" className={classes.header}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Cafe Coffee Day
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">
              About us
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/details">
              Specials
            </Nav.Link>
          </Nav>
          <Button className={classes.btn} onClick={props.onShow}>
            Cart <Badge bg="secondary">{totalAmount}</Badge>
          </Button>
        </Container>
      </Navbar>
    </>
  );
}

export default Headings;
