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
              <Button variant="outline-warning" className="navbar-button">
                Search
              </Button>
            </Form>
            {/* 음악 재생 버튼 */}
            {/* <Button
              variant="outline-warning"
              className="navbar-button"
              onClick={toggleMusic}
            >
              {isPlaying ? "⏹" : "▶️"}
            </Button> */}
            {/* YouTube 플레이어 */}
            {/* {isPlaying && (
              <YouTube
                videoId="96KbDuAV4ds" // Shape of You의 유튜브 영상 ID
                opts={{ height: "0", width: "0", playerVars: { autoplay: 1 } }}
              />
            )} */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      <Footer/>
    </Container>
  );
};

export default AppLayout;
