import React, {useState, useMemo} from 'react'
import {Row, Col, Button, Dropdown} from 'react-bootstrap'
import ProductPagination from './ProductPagination';
import SocialMediaIcons from './SocialMediaIcons';
import { BiTransfer} from "react-icons/bi";
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {RiDeleteBin5Line} from 'react-icons/ri'

const WishlistProducts = ({ isLoggedIn, products}) => {
	const[State, setCartHandler] = useState({
    cartState : true,
    cartIndex : "0"
  }
    );
//console.log(products)
    const [transferPrdctState, setTrnsferPrdctState] = useState({
      productState : false,
      productIndex : 0
})
    let pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const currentWishListData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return products.slice(firstPageIndex, lastPageIndex);
    }, [pageSize, currentPage]);

  
  function cartHandler(id,index){
        setCartHandler({
          cartState : !State.cartState,
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

function deleteProduct(product){
  //dispatch({type:"REMOVE_PRODUCT", payload:product})
}

	return(
<>
        {currentWishListData.map((product,id,index) => (
             <Row style={{borderBottom:'1px solid rgb(245,245,244',position:'relative'}} className='pb-2 mb-3' key={id}>
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
                    <span className='fs-5' onClick={() => {transferProductHandler(id, index)}}>
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
                  <span className="add_to_cart fs-5" onClick={() => cartHandler(id,index)}>
                   <AiOutlineShoppingCart/>
                  </span>
                </Col>
              </Row>
            </Col>
           {/* <Row className='qtyContainer'>
           <Col sm={10} className={`${!State.cartState && id===State.cartIndex ? 'display-b':'display-n'}`}>
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
        totalCount={products.length}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
      />
      </Col>
      </Row>
        </>
		)
}

export default WishlistProducts;