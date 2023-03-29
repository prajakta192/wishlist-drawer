import React from "react";
import { Offcanvas, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import EmptyWishlistComponent from '../components/EmptyWishlistComponent'
import WishlistProducts from '../components/WishlistProducts'
import AddToCategory from "../components/AddToCategory";
import {useWishlistContext} from '../context/ProductContext'
import "../styles/wishlistdrawer.css";

const WishlistDrawerPage = ({ isOpen, closeCart }) => {
  const isLoggedIn = true;
  const{state:{cart}} = useWishlistContext()

  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end" scroll="true">
        <header className="customCanavasHeader">
          <Offcanvas.Header style={{ cursor: "pointer" }}>
            <Offcanvas.Title>
             
              <AddToCategory closeCart={closeCart} isLoggedIn={isLoggedIn}/>
          
            </Offcanvas.Title>

          </Offcanvas.Header>
          {!isLoggedIn && (
            <Row className='mx-1 mb-2'>
              <Col sm={12}>
                Wishlist is not saved permanently yet. Please
                <Link to="/signin"> log in</Link> or <Link to="/"> Create Account </Link>
                to save it.
              </Col>
            </Row>
          )}
        </header>
        <Offcanvas.Body>
          {cart.length <= 0 && (
          <EmptyWishlistComponent closeCart={closeCart}/>
          )
        }
       <WishlistProducts isLoggedIn={isLoggedIn}/>
        
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default WishlistDrawerPage;
