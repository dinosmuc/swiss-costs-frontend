// MyNavbar.component.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Title from '../title-components/Title.component';
import './navbar.styles.scss';

const MyNavbar = ({ language, handleLanguageChange }) => {
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
                        <Nav.Link as={Link} to="/link3" className="custom-nav-link">SwissCopilot</Nav.Link>
                    </Nav>
                    <Nav className="ms-lg-auto custom-nav">
                        <span className={`language-option ${language === 'English' ? 'active' : ''}`}
                            onClick={() => handleLanguageChange('English')}>
                            English
                        </span>
                        <span className="language-separator">|</span>
                        <span className={`language-option ${language === 'German' ? 'active' : ''}`}
                            onClick={() => handleLanguageChange('German')}>
                            German
                        </span>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
