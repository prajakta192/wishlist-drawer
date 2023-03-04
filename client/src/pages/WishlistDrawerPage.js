import React, { useState, useEffect } from "react";
import { Offcanvas, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import WishlistAddedList from '../components/WishlistAddedList'

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/wishlistdrawer.css";

const WishlistDrawerPage = ({ isOpen, closeCart, wishlist,setWishlist }) => {
 
  
  const isLoggedIn = true;
  const [showCategory, setShowCategory] = useState(false);
  const[showCartHandler, setCartHandler] = useState(false);
  const [saveCategory, setSaveCategory] = useState("");

  useEffect(() => {
    setWishlist(
      localStorage.getItem("wishlist")
        ? JSON.parse(localStorage.getItem("wishlist"))
        : []
    );
  }, []);


  const addToCategory = () => {
    setShowCategory((prevCategory) => !prevCategory);
    //console.log(showCategory);
  };
  const saveToCategory = () => {
    //console.log("save category");
  };
function cartHandler(product){
  console.log(product.id)
    wishlist.forEach((item) => {
      console.log(item.id)
      if(item.id === product.id){
        setCartHandler((prevCart) => !prevCart);
      }
    })
  
}

function deleteProduct(item){
  console.log('deleted')
}

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
                    <strong style={{ fontSize: "14px" }}> My Wishlist ({wishlist.length})</strong>
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
                      disabled={saveCategory == ""}
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
            <Row className='mx-1'>
              <Col sm={12}>
                Wishlist is not saved permanently yet. Please
                <Link to="/"> log in</Link> or <Link to="/"> Create Account </Link>
                to save it.
              </Col>
            </Row>
          )}
        </header>
        <Offcanvas.Body>
        {wishlist.map((product,id) => (
             <Row style={{borderBottom:'1px solid rgb(233,233,232', marginBottom:'1.5rem'}} key={id}>
            <Col sm={2}>
              <img src={product.img} alt={product.name} />
            </Col>
            <Col sm={10} >
              <Row>
              {showCartHandler ?(
              <Col sm={10}>
            <div className='iwish_qty_box'>
              <div className='qty_box'>
                <span>
                  <i className="fa-solid fa-minus"></i>
                </span>
                <span className='iwishProQuantity'><strong>1</strong></span>
                <span>
                  <i className="fa-regular fa-plus"></i>
                </span>
              </div>
            </div>
          </Col>
                
              ):
               <Col sm={10}>
                  <span className="pTitle">{product.product_title}</span>
                </Col>
            }
             
                <Col sm={2}>
                  <span className="add_to_cart" onClick={() => cartHandler(product)}>
                    <i
                      className="fa-solid fa-cart-plus"
                      title="Add to Cart"
                    ></i>
                  </span>
                </Col>
              </Row>
              <Row>
                <Col sm={10}>
                  <span className="pSize">XS</span>
                </Col>
                {isLoggedIn && (
                  <Col sm={2}>
                    <span>
                      <i
                        className="fa-solid fa-code-compare"
                        title="Transfer Product"
                        style={{ transform: "rotate(90deg)" }}
                      ></i>
                    </span>
                  </Col>
                )}
              </Row>
              <Row>
                <Col sm={10}>
                  <div>
                    <span className="pPrice"> ₹{product.price}</span>
                  </div>
                </Col>
                <Col sm={2}>
                  <span>
                    <i className="fa-solid fa-trash" title="Delete Product" onClick={() => deleteProduct(product)}></i>
                  </span>
                </Col>
              </Row>
            </Col>

            <Row className='mt-2'>
         
        </Row>
          </Row>
        
        ))}
           
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default WishlistDrawerPage;
