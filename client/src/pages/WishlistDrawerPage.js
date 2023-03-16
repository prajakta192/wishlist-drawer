import React,{useState} from "react";
import { Offcanvas, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import EmptyWishlistComponent from '../components/EmptyWishlistComponent'
import WishlistProducts from '../components/WishlistProducts'
import AddToCategory from "../components/AddToCategory";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/wishlistdrawer.css";



const WishlistDrawerPage = ({ isOpen, closeCart, wishlist,setWishlist }) => {
  const isLoggedIn = true;
  
 let [initialvalue, setInitialValue] = useState([]);
 initialvalue = localStorage.getItem("wishlist")
        ? JSON.parse(localStorage.getItem("wishlist"))
        : null
  
   
  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end" scroll="true">
        <header className="customCanavasHeader">
          <Offcanvas.Header style={{ cursor: "pointer" }}>
            <Offcanvas.Title>
             
              <AddToCategory initialvalue={initialvalue} wishlist={wishlist} closeCart={closeCart} isLoggedIn={isLoggedIn}/>
          
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
          {(initialvalue?initialvalue:wishlist).length <= 0 && (
          <EmptyWishlistComponent closeCart={closeCart}/>
          )
        }
       <WishlistProducts initialvalue={initialvalue} setInitialValue={setInitialValue} isLoggedIn={isLoggedIn} wishlist={wishlist}/>
        
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default WishlistDrawerPage;
