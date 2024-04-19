import React from "react";
import { Container, Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Container>
      <div>
      <Spinner animation="border" variant="warning" />
      </div>
      <div>
        잠시만 기다려주세요
      </div>
    </Container>
  );
};

export default Loader;
