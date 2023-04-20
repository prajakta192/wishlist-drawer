import React from "react";
import { Offcanvas, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import EmptyWishlistComponent from '../components/EmptyWishlistComponent'
import ProductPagination from '../components/ProductPagination'
import WishlistProducts from '../components/WishlistProducts'
import AddToCategory from "../components/AddToCategory";
import "../styles/wishlistdrawer.css";

const WishlistDrawerPage = ({ isOpen, closeCart, products,setCategories,categories}) => {
  const isLoggedIn = true;
//console.log(products)
  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end" scroll="true">
        <header className="customCanavasHeader">
          <Offcanvas.Header style={{ cursor: "pointer" }}>
            <Offcanvas.Title>
              <AddToCategory closeCart={closeCart} isLoggedIn={isLoggedIn} products={products} categories={categories} setCategories={setCategories}/>
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
        {products.length < 0 ?  (
           <EmptyWishlistComponent closeCart={closeCart}/>
          ):
       (
        <ProductPagination
            data={products}
            RenderComponent={WishlistProducts}
            isLoggedIn={isLoggedIn}
            pageLimit={3}
            dataLimit={5}
          />
         ) 
          }
       
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default WishlistDrawerPage;
