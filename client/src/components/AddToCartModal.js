import { Button, Modal } from "react-bootstrap"
import AddToCartProduct from "./AddToCartProduct"
import {useWishlistContext} from '../context/ProductContext'

const AddToCartModal = ({handleClose, showModal,product}) => {
    const{state : {cart}, dispatch} = useWishlistContext();
    const addToWishlist = (product) => {
  
  dispatch({type:'ADD_TO_WISHLIST', payload:product})
}
  console.log('productpage', cart)

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