import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'

const WishlistProducts = ({initialvalue, isLoggedIn}) => {
	const[state, setCartHandler] = useState({
    cartState : false,
    cartIndex : -1
  }
    );
   
function cartHandler(index,state){
  //console.log(e.target.parentNode.parentNode.previousSibling)
      
        setCartHandler({
          cartState : state,
          cartIndex:index
       
    })
  
}
console.log(state.cartState)

function deleteProduct(item){
  console.log('deleted')
}
	return(
<>
        {initialvalue.map((product,id,index) => (
             <Row style={{borderBottom:'1px solid rgb(245,245,244', marginBottom:'1.5rem'}} key={id}>
            <Col sm={2} className='p-1'>
              <img src={product.img} alt={product.name} />
            </Col>
            <Col sm={10} >
              <Row>
               <Col sm={10} id={id}>
                  <span className="pTitle">{product.product_title}</span>
                </Col>
                
                <Col sm={2}>
                  <span className="add_to_cart" onClick={() => cartHandler(index,true)}>
                    <i
                      className="fa-solid fa-cart-plus"
                      title="Add to Cart"  id={id} 
                    ></i>
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
                    <i className="fa-solid fa-trash" title="Delete Product" onClick={() => deleteProduct(product)}></i>
                  </span>
                </Col>
              </Row>
            </Col>
           <Row>
           <Col sm={10} className={`${state.cartState && index===state.cartIndex ? 'display-b':'display-n'}`}>
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
        </>
		)
}

export default WishlistProducts;