import React, { useState, useEffect } from "react";
import { Offcanvas, Row, Col, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import WishlistAddedList from '../components/WishlistAddedList'
import EmptyWishlistComponent from '../components/EmptyWishlistComponent'
import WishlistProducts from '../components/WishlistProducts'

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/wishlistdrawer.css";

const WishlistDrawerPage = ({ isOpen, closeCart, wishlist,setWishlist }) => {
 
  
  const isLoggedIn = false;
  
 const initialvalue = localStorage.getItem("wishlist")
        ? JSON.parse(localStorage.getItem("wishlist"))
        : null
  
   
  const [showCategory, setShowCategory] = useState(false);
   const [saveCategory, setSaveCategory] = useState("");

  const addToCategory = () => {
    setShowCategory((prevCategory) => !prevCategory);
    //console.log(showCategory);
  };
  const saveToCategory = () => {
    //console.log("save category");
  };

   
  


  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end" scroll="true">
        <header className="customCanavasHeader">
          <Offcanvas.Header style={{ cursor: "pointer" }}>
            <Offcanvas.Title>
              <Row className={isLoggedIn?"title_container mb-2":"title_container"}>
                <Col sm={1} style={{ marginTop: ".20rem" }}>
                  <div>
                    <i
                      className="fa-solid fa-angle-right fa-sm"
                      style={{ cursor: "pointer" }}
                      onClick={closeCart}
                    >
                      
                    </i>
                  </div>
                </Col>
                <Col sm={10}>
                  <div>
                    <strong style={{ fontSize: "14px" }}> My Wishlist ({initialvalue.length})</strong>
                  </div>
                </Col>
                {isLoggedIn && (
                  <Col sm={1}>
                    <span>
                      <i
                        className="fa-regular fa-plus fa-sm"
                        title="Add New List"
                        onClick={addToCategory}
                      ></i>
                    </span>
                  </Col>
                )}
              </Row>
              {isLoggedIn && (
              		<WishlistAddedList/>
              	)}
               
              {showCategory && (
                <Row className="overlay">
                  <Col sm={9} className='p-0'>
                    <input type="text" />
                  </Col>
                  <Col sm={2}>
                    <Button
                      variant="outline-secondary"
                      className="btn-sm"
                      style={{
                        cursor: saveCategory === "" ? "not-allowed" : "pointer",
                      }}
                      disabled={saveCategory === ""}
                      onClick={saveToCategory}
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              )}
            
            </Offcanvas.Title>

          </Offcanvas.Header>
          {!isLoggedIn && (
            <Row className='mx-1 mb-2'>
              <Col sm={12}>
                Wishlist is not saved permanently yet. Please
                <Link to="/"> log in</Link> or <Link to="/"> Create Account </Link>
                to save it.
              </Col>
            </Row>
          )}
        </header>
        <Offcanvas.Body>{
          initialvalue.length <= 0 && (
          <EmptyWishlistComponent closeCart={closeCart}/>
          )
        }
       <WishlistProducts initialvalue={initialvalue} isLoggedIn={isLoggedIn}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default WishlistDrawerPage;
