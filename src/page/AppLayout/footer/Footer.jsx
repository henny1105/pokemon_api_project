import React from "react";
import "./Footer.style.css";
import { Container } from "react-bootstrap";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
<Container>
  <div className="app-footer">
    <span className="footer-first">© 2024 Company poke</span>

      <img width="50" height="50" className="footer-img" src="https://img.icons8.com/color/96/psyduck.png" alt="psyduck" 
      onClick={scrollToTop}/>

    <span className="footer-second">
      <a href="/" className="footer-second-child">Home</a>
      <a href="#" className="footer-second-child">FAQs</a>
      <a href="#" className="footer-second-child">About</a>
    </span>
  </div>
</Container>


  );
};

export default Footer;
