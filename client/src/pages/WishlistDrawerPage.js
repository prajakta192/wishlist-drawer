import React from "react";
import { Offcanvas, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import EmptyWishlistComponent from '../components/EmptyWishlistComponent'
import WishlistProducts from '../components/WishlistProducts'
import AddToCategory from "../components/AddToCategory";
import "../styles/wishlistdrawer.css";

const WishlistDrawerPage = ({ isOpen, closeCart, products}) => {
  const isLoggedIn = true;

  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end" scroll="true">
        <header className="customCanavasHeader">
          <Offcanvas.Header style={{ cursor: "pointer" }}>
            <Offcanvas.Title>
              <AddToCategory closeCart={closeCart} isLoggedIn={isLoggedIn} products={products}/>
            </Offcanvas.Title>
          </Offcanvas.Header>
          {!isLoggedIn && (
            <Row className='mx-1 mb-2'>
              <Col sm={12}>
                Wishlist is not saved permanently yet. Please
                <Link to="/signin"> log in </Link> or <Link to="/"> Create Account </Link>
                to save it.
              </Col>
            </Row>
          )}
        </header>
        <Offcanvas.Body>
          {products.length <= 0 && (
          <EmptyWishlistComponent closeCart={closeCart}/>
          )
        }
          <WishlistProducts isLoggedIn={isLoggedIn} products={products}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default WishlistDrawerPage;
