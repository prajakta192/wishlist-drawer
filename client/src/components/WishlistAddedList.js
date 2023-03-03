import React from 'react';
import {Row, Col, Dropdown} from 'react-bootstrap'

const WishListAddedList = () => {
	return(
			<>
				<Row>
					<Col sm={12} className='p-0'>
						<Dropdown>
							 <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        							Main wishlist
      					     </Dropdown.Toggle>
      					     <Dropdown.Menu>
       							 <ul>
       							 	<li>
       							 		<Row>
       							 			<Col sm={10}>
       							 				<span>Main Wishlist</span>
       							 			</Col>
       							 		</Row>
       							 	</li>
       							 	<li>
       							 		<Row>
       							 			<Col sm={10}>
       							 				<span>test</span>
       							 			</Col>
       							 			<Col sm={1}>
       							 				<img alt="trash" className="trash-btn" src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/editCat.svg"/>
       							 				{/*<img alt="trash" class="trash-btn" src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/saveCat.svg"/>*/}
       							 			</Col>
       							 			<Col sm={1}>
       							 				<img alt="delete" className="trash-btn" src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/trash_icon.svg"/>
       							 			</Col>
       							 		</Row>
       							 	</li>
       							 </ul>
     						 </Dropdown.Menu>
						</Dropdown>
					</Col>
				</Row>
			</>
		)
}

export default WishListAddedList;