import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';
import './AppLayout.style.css'

const AppLayout = () => {
  return (
    <Container>
        <Navbar expand="lg" className="bg-body-bg">
      <Container fluid>
        <Navbar.Brand href="/"><img width={120} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZr30BEmKcV7KsVuoSMqhd5HkFnQ7m7Yzvy9OuaqVskA&s" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#action2">Pokedex</Nav.Link>
            <Nav.Link href="#action2">Lucky Drow</Nav.Link>
            <Nav.Link href="#action2">Battle</Nav.Link>
            <Nav.Link href="#action2">Training</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search-text"
              aria-label="Search"
            />
            <Button variant="outline-warning">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet/>
    </Container>
  )
}

export default AppLayout