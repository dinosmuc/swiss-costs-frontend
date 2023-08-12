import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import Title from '../title-components/Title.component';

import './navbar.styles.scss';

const MyNavbar = () => {
    return (
        <Router>
            <Navbar className="custom-navbar" expand="lg">
                <Container>
                    <Navbar.Brand className="mx-auto"><Title /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" className="custom-toggler" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-lg-auto custom-nav">
                            <Nav.Link as={Link} to="/link1" className="custom-nav-link">About</Nav.Link>
                            <Nav.Link as={Link} to="/link2" className="custom-nav-link">Blog</Nav.Link>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Router>
    );
}

export default MyNavbar;

