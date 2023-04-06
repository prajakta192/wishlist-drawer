import React, { useState,useEffect } from "react";
import { Row, Col, Button, ToastContainer, Toast } from "react-bootstrap";
import {useWishlistContext} from '../context/ProductContext'
import AddToCartModal from '../components/AddToCartModal'


const ProductsPage = ({ product,openCart }) => {
   const{state : {cart , iWishList}, dispatch} = useWishlistContext();
//console.log(product)
  const [showModal, setShowModal] = useState(false);
const[warning, setWarning] = useState(false)

  const handleClose = () => {setShowModal(false)};
  
    const addToWishlist = (product) => {
        const isExistItem = cart.find((item) => item.id === product.id)
        dispatch({type:'ADD_TO_WISHLIST', payload:product});
        //console.log(product.variant.id)
        openCart();
        if(isExistItem){
            setWarning(true)
        }
        
        setTimeout(() => {
            setShowModal(false);
            setWarning(false)
        },2000)
}
  //console.log('productpage', cart)

    useEffect(() => {
      localStorage.setItem('Wishlist', JSON.stringify(cart));
      localStorage.setItem('iWishlist', JSON.stringify(iWishList))
    },[cart, iWishList])
//console.log(iWishList)
  return (
    <>
    {
      warning &&
      // <div className="warning">The product is already added to your wishlist</div>
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
           
             {/* <i className="fa-regular fa-heart fa-lg" onClick={()  => setShowModal(true)}></i>*/}
             <i className="fa-regular fa-heart fa-lg" onClick={()  => addToWishlist(product)}></i>

              {cart.lenght > 8 && (
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
                  {cart.length}
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
    {/*}  { showModal &&
       <AddToCartModal handleClose={handleClose} setWarning={setWarning} showModal={showModal} setShowModal={setShowModal} product={product}/>
     }*/}
      
    </>
  );
};

export default ProductsPage;
