import React, {useState} from 'react'
import {Row, Col, Dropdown} from 'react-bootstrap'
import { BiTransfer} from "react-icons/bi";
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {RiDeleteBin5Line} from 'react-icons/ri'

const WishlistProducts = ({ isLoggedIn, product,id, paginationData}) => {
	const[State, setCartHandler] = useState({
    cartState : true,
    cartIndex : "0"
  }
    );
console.log(paginationData)
    const [transferPrdctState, setTrnsferPrdctState] = useState({
      productState : false,
      productIndex : 0
})
   
  function cartHandler(id){
        setCartHandler({
          cartState : !State.cartState,
          cartIndex:id
    })
}
// transfer Product
function transferProductHandler(id){
  debugger;
    //console.log(id)
    setTrnsferPrdctState({
      productState : !transferPrdctState.productState,
      productIndex : id
    })
}


	return(
        <>
             <Row style={{borderBottom:'1px solid rgb(245,245,244',position:'relative'}} className='pb-2 mb-3'>
            <Col sm={2} className='p-1'>
              <img src={product.featuredImage} alt={product.title} />
            </Col>
            <Col sm={10} >
              <Row>
                <Col sm={10} className="align-items-center">
                  <Row className="align-items-center">
                    <Col sm={10}>

                  <span className="pTitle" title={product.title}>{product.title}</span>
                    </Col>
                    
                  </Row>
                </Col>
                 <Col sm={2}>
                  <span className='fs-5'  onClick={() => window.removeFromWishlist(product.id, product.variant.id)}>
                   <RiDeleteBin5Line/>
                  </span>
                </Col>
               
              </Row>
              <Row>
                <Col sm={10}>
                  <Row>
                    <Col sm={2}>
                      <span className="pSize">XS</span>
                    </Col>
                    <Col sm={10}>
                    <Dropdown className={`transferMenu ${transferPrdctState.productState && id=== transferPrdctState.productIndex ? 'display-b' : 'display-n'}`}>
                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                          Main Wishlist
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </Col>
                  </Row>
                </Col>
                {isLoggedIn && (
                  <Col sm={2}>
                    <span className='fs-5' onClick={() => {transferProductHandler(id)}}>
                      <BiTransfer/>
                    </span>
                  </Col>
                )}
              </Row>
              <Row>
                <Col sm={10}>
                <Row className="align-items-end">
                  <Col sm={4}>
                    <span className="pPrice"> ₹{product.variant.price}</span>
                  </Col>
                  <Col sm={8} className="p-0">
                      <div className={`${!State.cartState && id===State.cartIndex ? 'display-b':'display-n'}`}>
                        <div className='iwish_qty_box'>
                          <div className='qty_box'>
                            <span>
                              <i className="fa-solid fa-minus"></i>
                            </span>
                            <span className='iwishProQuantity'><strong>1</strong></span>
                            <span>
                              <i className="fa-regular fa-plus"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
               <Col sm={2}>
                  <span className="add_to_cart fs-5" onClick={() => cartHandler(id)}>
                   <AiOutlineShoppingCart/>
                  </span>
                </Col>
              </Row>
            </Col>
         
          </Row>
        </>
		)
}

export default WishlistProducts;