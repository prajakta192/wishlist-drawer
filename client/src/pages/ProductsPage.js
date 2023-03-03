import React, { useEffect, useState } from "react";
import data from "../data";
import { Row, Col, Button } from "react-bootstrap";

const ProductsPage = ({ product, addToWishlist, iWishCnt }) => {
  //console.log(product);
  //const[product, setProduct] = useState({})
console.log(product);
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(product));
  }, [product]);

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
              onClick={() => addToWishlist(iWishCnt + 1)}
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
          </div>
        </Col>
        <Col sm={6}>
          <p>{product.handle}</p>
        </Col>
        <Col sm={6}>
          <span>Rs. {product.price}</span>
        </Col>
      </Row>
    </>
  );
};

export default ProductsPage;
