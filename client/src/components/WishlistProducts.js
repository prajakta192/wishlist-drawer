import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'

const WishlistProducts = ({initialvalue, isLoggedIn}) => {
	const[showCartHandler, setCartHandler] = useState(false);
   
function cartHandler(product){
  console.log(product)
  
    initialvalue.forEach((item) => {
      //console.log(product.id)
      if(item.id === product.id){
        setCartHandler((prevCart) => !prevCart);
      }
    })
  
}

function deleteProduct(item){
  console.log('deleted')
}
	return(
<>
        {initialvalue.map((product,id) => (
             <Row style={{borderBottom:'1px solid rgb(245,245,244', marginBottom:'1.5rem'}} key={id}>
            <Col sm={2} className='p-1'>
              <img src={product.img} alt={product.name} />
            </Col>
            <Col sm={10} >
              <Row>
              {showCartHandler ?(
              <Col sm={10}>
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
                
              ):
               <Col sm={10}>
                  <span className="pTitle">{product.product_title}</span>
                </Col>
            }
             
                <Col sm={2}>
                  <span className="add_to_cart" id={id}  onClick={() => cartHandler(product)}>
                    <i
                      className="fa-solid fa-cart-plus"
                      title="Add to Cart"
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
          </Row>
        
        ))}
        </>
		)
}

export default WishlistProducts;