import React,{useState, useEffect} from 'react'
import {Offcanvas,Row,Col,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/wishlistdrawer.css';

const WishlistDrawerPage = ({isOpen,closeCart,iWishCnt}) => {
	//const [isWislist,setWishList] = useState(false);
	const [product, setProduct] = useState('');
	const isLoggedIn = true;
	const [showCategory, setShowCategory] = useState(false);
	const[saveCategory, setSaveCategory] = useState('')
	
	useEffect(() => {
			setProduct(localStorage.getItem('wishlist')?JSON.parse(localStorage.getItem('wishlist')):null);
			
	},[isOpen]);

	const addCategory = () => {
		
		setShowCategory(prevCategory => !prevCategory);
		console.log(showCategory);
	}
	const savCategory =() => {
		console.log('save category')
	}

	return(
		<>
	<Offcanvas show={isOpen} onHide={closeCart} placement='end' scroll='true'>
	<header className='customCanavasHeader'>
				<Offcanvas.Header style={{cursor:'pointer'}}>
					<Offcanvas.Title>
					 <Row className='title_container'>
				<Col sm={1} style={{marginTop:'.20rem'}}> 
					<div>
						<i className="fa-solid fa-angle-right fa-sm"  style={{cursor:"pointer"}} onClick={closeCart} > </i>
					</div>
			 </Col>
				<Col sm={10}>
				 <div>
					<strong style={{fontSize:'14px'}}>  My Wishlist</strong>
				 </div>
				</Col>
				{isLoggedIn &&(
					
				<Col sm={1}>
						<span>
								<i className="fa-regular fa-plus fa-sm" title='Add New List' onClick={addCategory}></i>
						</span>
				</Col>
				)
			}
			</Row>
			{showCategory && (

					<Row className='overlay'>
					<Col sm={9}>
							<input type='text' />

					</Col>
					<Col sm={2}>
						<Button variant="outline-secondary" className='btn-sm' style={{cursor: saveCategory === ''?'not-allowed':'pointer'}} disabled={saveCategory == ''} onClick={savCategory}>Save</Button>
					</Col>
			</Row>
			)}
			
				 
					</Offcanvas.Title>

				</Offcanvas.Header>
				{!isLoggedIn && (
					<Row>
						<Col sm={12}>Wishlist is not saved permanently yet. Please <Link to='/'>log in</Link> or <Link to='/'>Create Account</Link> to save it.</Col>
					</Row>
				)

			}
					

	</header>        
				<Offcanvas.Body>
									<Row>
											<Col sm={2}>
												<img src={product.img} alt={product.name} />
											</Col>
											<Col sm={10} className='p-0'>
									<Row>
											<Col sm={10}>
												<span className='pTitle'>{product.product_title}</span>
												{/*
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
												</div>*/}
											</Col>
											<Col sm={2}>
											<span className='add_to_cart'><i className="fa-solid fa-cart-plus" title='Add to Cart'></i></span>
											
											</Col>
									</Row>
									<Row>
									 		<Col sm={10}>
									 				<span className='pSize'>XS</span>
									 		</Col>
									 		{
									 			isLoggedIn && (
									 					<Col sm={2}>
									 				<span>
																		<i className="fa-solid fa-code-compare" title='Transfer Product' style={{transform:'rotate(90deg)'}}></i>
																</span>
									 		</Col>
									 			)
									 		}	
									 		
									</Row>
									<Row>
												<Col sm={10}>
														<div>
												
													<span> ₹{product.price}</span>
												</div>
												</Col>
												<Col sm={2}>
															<span>
																		<i className="fa-solid fa-trash" title='Delete Product'></i>
																</span>
												</Col>
									</Row>

									{/*oTHER structure*/}
									{/*<Row className='mt-2'>
											<Col sm={6}>
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
											<Col sm={6} className='d-flex justify-content-end'>
												
											<span className='add_to_cart'><i className="fa-solid fa-cart-plus fa-lg"></i></span>
											</Col>
									</Row>*/}
								</Col>
						</Row>
				</Offcanvas.Body>
		</Offcanvas>
		</>
		)
}

export default WishlistDrawerPage;