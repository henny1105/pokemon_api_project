import React, { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import "./AppLayout.style.css";
import YouTube from "react-youtube";
import Footer from "./footer/Footer";

const AppLayout = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <Container>
      <Navbar expand="lg" className="bg-body-bg navbar-box">
        <Container fixed>
          <Navbar.Brand href="/">
            <img
              width={120}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZr30BEmKcV7KsVuoSMqhd5HkFnQ7m7Yzvy9OuaqVskA&s"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "200px" }}
              navbarScroll
            >
              <Nav.Link href="/" className="navbar-link">Home</Nav.Link>
              <Nav.Link href="/pokemondex" className="navbar-link">PokemonDex</Nav.Link>
              <Nav.Link href="/random" className="navbar-link">Lucky Draw</Nav.Link>
              <Nav.Link href="/battle" className="navbar-link">Battle</Nav.Link>
              <Nav.Link href="/mypokemon" className="navbar-link">MyPokemon</Nav.Link>
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      <Footer/>
    </Container>
  );
};

export default AppLayout;
