import React from 'react';
import {Row, Col,Button} from 'react-bootstrap'

const EmptyWishlistComponent = ({closeCart}) => {
	return(

			<Row className="text-center">
				<Col sm={12}>
					<img src='https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/empty-heart.png' alt='wishlist-empty'/>
				</Col>
				<Col sm={12}>
					<p>Your wishlist is empty!</p>
				</Col>
				<Col sm={12}>
					<Button variant="outline-secondary" onClick={closeCart}>Continue Shopping</Button>
				</Col>
			</Row>
		)
}

export default EmptyWishlistComponent
