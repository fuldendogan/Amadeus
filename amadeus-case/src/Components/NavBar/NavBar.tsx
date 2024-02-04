// NavBar.js
import React from 'react';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import DarkMode from "../DarkMode/DarkMode";


const NavBar = () => {


    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">Amadeus Case</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link href="#menu">Menü</Nav.Link>
                        <Nav.Link href="#about">Hakkında</Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link href="#login">Uye Girişi</Nav.Link>
                        <Nav.Link href="#register">Uye Ol</Nav.Link>

                    </Nav>
                    <Form inline>
                        <DarkMode/>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
