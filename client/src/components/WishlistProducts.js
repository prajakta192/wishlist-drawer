import React, {useState, useMemo} from 'react'
import {Row, Col, Button, Dropdown} from 'react-bootstrap'
import ProductPagination from './ProductPagination';
import SocialMediaIcons from './SocialMediaIcons';

const WishlistProducts = ({initialvalue, isLoggedIn}) => {
	const[state, setCartHandler] = useState({
    cartState : true,
    cartIndex : "0"
  }
    );

    const [transferPrdctState, setTrnsferPrdctState] = useState({
      productState : false,
      productIndex : 0
})
    let pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const[productInpagination, setProductInPagination] = useState(initialvalue)

    const currentWishListData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return productInpagination.slice(firstPageIndex, lastPageIndex);
    }, [pageSize, currentPage,productInpagination]);

  
  function cartHandler(id,index){
        setCartHandler({
          cartState : !state.cartState,
          cartIndex:id
       
    })
}
// transfer Product
function transferProductHandler(id){
    console.log(id)
    setTrnsferPrdctState({
      productState : !transferPrdctState.productState,
      productIndex : id
    })
}

function deleteProduct(id){
  //console.log(id, initialvalue)
  let remainedProduct = productInpagination.filter((product) => product.id !== id);
  console.log(remainedProduct)
  setProductInPagination(remainedProduct)
  //console.log(initialvalue)
}
console.log(productInpagination)
	return(
<>
        {currentWishListData.map((product,id,index) => (
             <Row style={{borderBottom:'1px solid rgb(245,245,244',position:'relative'}} className='pb-2 mb-3' key={id}>
            <Col sm={2} className='p-1'>
              <img src={product.img} alt={product.name} />
            </Col>
            <Col sm={10} >
              <Row>
               {/* <Col sm={10} style={{opacity : !state.cartState && id===state.cartIndex ? 0:1}}>
                  <span className="pTitle">{product.id} {product.product_title}</span>
                </Col> */}
                <Col sm={10}>
                  <Row>
                    <Col sm={8}>

                  <span className="pTitle" title={product.product_title}>{product.product_title}</span>
                    </Col>
                    <Col sm={4}>
                      <div className={`${!state.cartState && id===state.cartIndex ? 'display-b':'display-n'}`}>
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
                  <span className="add_to_cart" onClick={() => cartHandler(id,index)}>
                    <i
                      className="fa-solid fa-cart-plus"
                      title="Add to Cart"></i>
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
                    <span onClick={() => {transferProductHandler(id, index)}}>
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
                  <span  onClick={() => deleteProduct(product.id)}>
                    <i className="fa-solid fa-trash" title="Delete Product"></i>
                  </span>
                </Col>
              </Row>
            </Col>
           {/* <Row className='qtyContainer'>
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
           </Row> */}
          </Row>
        
        ))}
        <Row>
          <Col sm={12}>
              <Button variant='outline-secondary btn-md text-uppercase w-100' className='addToCart'>Add All to cart</Button>
          </Col>
        </Row>

        <Row className='fixed-bottom mt-3'>
        <Col sm={6}>
        <SocialMediaIcons/>
      </Col>
      <Col sm={6}>
        <ProductPagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={productInpagination.length}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
      />
      </Col>
      </Row>
        </>
		)
}

export default WishlistProducts;