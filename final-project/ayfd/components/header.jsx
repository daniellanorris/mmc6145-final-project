import React from "react";
import styles from '../public/styles/headerfooter.module.css';
import useLogout from '../hooks/useLogout';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header() {
  const loggeroutter = useLogout();

  return (
    <>
        <Navbar expand="lg" data-bs-theme="dark">
      <Container>
      <div>
          <img href="/" width="100" height="100" src="/LOGO-white.png" className={styles.autoheightimg} alt="logo" style={{ padding: "10px" }} />
        </div>
        <Navbar.Brand className="bg-lt" href="#home"> <h1 style={{color:"white"}}> ayfd? </h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
            <Nav.Link onClick={loggeroutter} href="/login">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  )
}