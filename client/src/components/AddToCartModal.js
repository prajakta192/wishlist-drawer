
import React,{useEffect} from 'react'
import { Button, Modal } from "react-bootstrap"
import AddToCartProduct from "./AddToCartProduct"
import {useWishlistContext} from '../context/ProductContext'
import {getCounter} from '../script/sample'

const AddToCartModal = ({handleClose,setWarning, showModal,setShowModal,product}) => {
    const{state : {cart , iWishList}, dispatch} = useWishlistContext();
    

    const addToWishlist = (product) => {
        const isExistItem = cart.find((item) => item.id === product.id)
        dispatch({type:'ADD_TO_WISHLIST', payload:product});
        //console.log(product.variant.id)
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
    <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>My Wishlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AddToCartProduct/>
            <button onClick={() => getCounter(iWishList)}>click</button>
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