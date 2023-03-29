
import React,{useEffect} from 'react'
import { Button, Modal } from "react-bootstrap"
import AddToCartProduct from "./AddToCartProduct"
import {useWishlistContext} from '../context/ProductContext'

const AddToCartModal = ({handleClose,setWarning, showModal,setShowModal,product}) => {
    const{state : {cart}, dispatch} = useWishlistContext();
    

    const addToWishlist = (product) => {
        const isExistItem = cart.find((item) => item.id === product.id)
        dispatch({type:'ADD_TO_WISHLIST', payload:product});
        if(isExistItem){
            setWarning(true)
        }
        
        setTimeout(() => {
            setShowModal(false);
            setWarning(false)
        },2000)
}
  console.log('productpage', cart)

useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(cart));
},[cart])

    return (
        <>
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
    )
} 
export default AddToCartModal