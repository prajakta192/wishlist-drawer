import React, { useState } from "react";
import AddToCartProduct from '../components/AddToCartProduct'
import { Row, Col, Button, Modal, ToastContainer, Toast } from "react-bootstrap";

const ProductsPage = ({ warning, product, addToWishlist, wishlist }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  
  return (
    <>
    {
      warning &&
      // <div className="warning">The product is already added to your wishlist</div>
      <ToastContainer position="top-end">
      <Toast className="d-inline-block m-1"
        bg='warning'>
      <Toast.Body  style={{fontSize:'12px',padding:'.28rem'}}>The product is already added to your wishlist</Toast.Body>
      </Toast>
    </ToastContainer>
    }
    
      <Row
        className="product_container d-flex flex-column justify-content-center align-items-center">
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
           
              <i className="fa-regular fa-heart fa-lg" onClick={handleShow}></i>

              {wishlist.lenght > 8 && (
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
        <Col sm={6} className='mb-4'>
          <p>{product.handle}</p>
          <p>Rs. {product.price}</p>
        </Col>
       
      </Row>
      <Modal show={showModal} onHide={handleClose} animation={false}>
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
          <Button variant="primary" onClick={() => addToWishlist(product)}>
            Add to wishlist
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductsPage;
