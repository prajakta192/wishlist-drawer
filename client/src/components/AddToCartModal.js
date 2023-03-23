import { Button, Modal } from "react-bootstrap"
import AddToCartProduct from "./AddToCartProduct"

const AddToCartModal = ({handleClose, handleShow}) => {
  
    return (
        <>
    <Modal show={handleShow} onHide={handleClose} animation={false}>
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
          <Button variant="primary">
            Add to wishlist
          </Button>
        </Modal.Footer>
    </Modal>
        </>
    )
} 
export default AddToCartModal