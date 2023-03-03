import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";

const Header = ({ openCart, iWishCnt }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">WishlistDrawer</Navbar.Brand>
        <Button
          variant="outline-dark"
          onClick={openCart}
          className="rounded-circle"
          style={{
            width: "2rem",
            height: "2rem",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i className="fa-regular fa-heart"></i>
          {iWishCnt > 0 && (
            <div
              className="rounded-circle bg-dark d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1rem",
                height: "1rem",
                fontSize: "12px",
                fontWeight: "bold",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {iWishCnt}
            </div>
          )}
        </Button>
      </Container>
    </Navbar>
  );
};
export default Header;
