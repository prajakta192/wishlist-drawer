import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ openCart, wishlist }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">WishlistDrawer
          </Link>
          </Navbar.Brand>
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
          <i className="fa-regular fa-heart fa-lg"></i>
          {/*{wishlist.length > 0 && (
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
              {wishlist.length}
            </div>
            )}*/}
        </Button>
      </Container>
    </Navbar>
  );
};
export default Header;
