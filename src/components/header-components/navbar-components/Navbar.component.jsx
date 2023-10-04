import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Title from '../title-components/Title.component';

import './navbar.styles.scss';

const MyNavbar = () => {
    return (
        <Navbar className="custom-navbar" expand="lg">
            <Container>
                <Navbar.Brand className="mx-auto">
                    <Link to="/"><Title /></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" className="custom-toggler" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-lg-auto custom-nav">
                        <Nav.Link as={Link} to="/link2" className="custom-nav-link">About</Nav.Link>
                        <Nav.Link as={Link} to="/link3" className="custom-nav-link">Extras</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
