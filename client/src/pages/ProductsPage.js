import React from "react";
import { Row, Col, Button, ToastContainer, Toast } from "react-bootstrap";

const ProductsPage = ({ product,openCart}) => {
  //const [showModal, setShowModal] = useState(false);
  const warning = false

  return (
    <>
    {
      warning &&
      <ToastContainer position="top-start">
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
              gap:'20px'
            }}
          >
            <img
              src={product.featuredImage}
              alt={product.title}
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
             <i className="fa-regular fa-heart fa-lg" onClick={()  => window.addToWishlist(product.id, product.variant.id, openCart())}></i>

              {product.lenght > 8 && (
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
                  {product.length}
                </div>
                
              )}
            </Button>
          </div>
        </Col>
        <Col sm={6} className='mb-4'>
          <p>{product.handle}</p>
          <p>Rs. {product.variant.price}</p>
         
        </Col>
       
      </Row>
   
    </>
  );
};

export default ProductsPage;
