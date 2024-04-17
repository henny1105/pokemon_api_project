import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import './AppLayout.style.css'

const AppLayout = () => {
  return (
    <Container>
        <Navbar expand="lg" className="bg-body-bg">
      <Container fixed>
        <Navbar.Brand href="/"><img width={120} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZr30BEmKcV7KsVuoSMqhd5HkFnQ7m7Yzvy9OuaqVskA&s" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/pokemondex">PokemonDex</Nav.Link>
            <Nav.Link href="/random">Lucky Drow</Nav.Link>
            <Nav.Link href="/battle">Battle</Nav.Link>
            <Nav.Link href="/mypokemon">MyPokemon</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search-text"
              aria-label="Search"
            />
            <Button variant="outline-warning" className="navbar-button">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet/>
    </Container>
  )
}

export default AppLayout