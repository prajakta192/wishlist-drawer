import React, {useState, useEffect} from 'react'
import {Row, Col, Button} from 'react-bootstrap'

const WishlistProducts = ({initialvalue, isLoggedIn,setInitialValue,wishlist}) => {
	const[state, setCartHandler] = useState({
    cartState : true,
    cartIndex : "0"
  }
    );
   
function cartHandler(id){
  console.log(id)
        setCartHandler({
          cartState : !state.cartState,
          cartIndex:id
       
    })
  console.log(state)
}

function deleteProduct(id){
  console.log(id)
  //let deletedProduct = initialvalue.filter((product) => product.id !== id);
  
}
	return(
<>
        {initialvalue.map((product,id,index) => (
             <Row style={{borderBottom:'1px solid rgb(245,245,244',position:'relative'}} className='pb-2 mb-2' key={id}>
            <Col sm={2} className='p-1'>
              <img src={product.img} alt={product.name} />
            </Col>
            <Col sm={10} >
              <Row>
               <Col sm={10} style={{opacity : !state.cartState && id===state.cartIndex ? 0:1}}>
                  <span className="pTitle">{product.product_title}</span>
                </Col>
                
                <Col sm={2}>
                  <span className="add_to_cart" onClick={() => cartHandler(id)}>
                    <i
                      className="fa-solid fa-cart-plus"
                      title="Add to Cart"></i>
                  </span>
                </Col>
              </Row>
              <Row>
                <Col sm={10}>
                  <span className="pSize">XS</span>
                </Col>
                {isLoggedIn && (
                  <Col sm={2}>
                    <span>
                      <i
                        className="fa-solid fa-code-compare"
                        title="Transfer Product"
                        style={{ transform: "rotate(90deg)" }}
                      ></i>
                    </span>
                  </Col>
                )}
              </Row>
              <Row>
                <Col sm={10}>
                  <div>
                    <span className="pPrice"> ₹{product.price}</span>
                  </div>
                </Col>
                <Col sm={2}>
                  <span>
                    <i className="fa-solid fa-trash" title="Delete Product" onClick={() => deleteProduct(product.id)}></i>
                  </span>
                </Col>
              </Row>
            </Col>
           <Row className='qtyContainer'>
           <Col sm={10} className={`${!state.cartState && id===state.cartIndex ? 'display-b':'display-n'}`}>
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
          </Col>
           </Row>
          </Row>
        
        ))}
        <Row>
          <Col sm={12}>
              <Button variant='outline-secondary btn-md text-uppercase w-100' className='addToCart'>Add All to cart</Button>
          </Col>
        </Row>
        </>
		)
}

export default WishlistProducts;