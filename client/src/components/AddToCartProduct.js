import React from 'react';
import {Row, Col} from 'react-bootstrap'

const AddToCartProduct = () => {
	return (
			<>
				<Row className='mt-2'>
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
												
						<span className='add_to_cart' ><i className="fa-solid fa-cart-plus fa-lg" title='Add To Cart'></i></span>
					</Col>
				</Row>
			</>
		)
}

export default AddToCartProduct