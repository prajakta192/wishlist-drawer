import React, { useEffect, useState } from "react";
import data from "../data";
import AddToCartProduct from '../components/AddToCartProduct'
import { Row, Col, Button, Modal } from "react-bootstrap";

const ProductsPage = ({ product, addToWishlist, wishlist }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  return (
    <>
      <Row
        className="product_container d-flex flex-column justify-content-center align-items-center"
        key={product.id}
      >
        <Col sm={6}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, auto)",
              padding: "1rem",
              backgroundColor: "#F1F1F0",
            }}
          >
            <img
              src={product.img}
              alt={product.product_title}
              style={{ width: "100%", height: "100%" }}
            />
            <Button
              onClick={() => addToWishlist(product)}
              variant="outline-dark"
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
           
              <i className="fa-regular fa-heart" onClick={handleShow}></i>

              {wishlist.lenght > 0 && (
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
                
              )}
            </Button>
          </div>
        </Col>
        <Col sm={6}>
          <p>{product.handle}</p>
        </Col>
        <Col sm={6}>
          <span>Rs. {product.price}</span>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>My Wishlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AddToCartProduct/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductsPage;
