import React from "react";
import { useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Header = () => {
  const loc = useLocation();

  return (
    <>
      {/* <div>Header</div> */}
      {/* {loc.pathname === "/events" ? <div>Events</div> : <div>Challenges</div>} */}
    
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Py-Plat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/playground">Play Ground</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Header;
