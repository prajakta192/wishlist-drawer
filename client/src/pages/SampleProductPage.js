import {useGlobalContext} from '../context/ProductContext'
import {Container, Row, Col, Button} from 'react-bootstrap'
import '../styles/products.scss'
import AddToCartModal from '../components/AddToCartModal';
import { useState } from 'react';

const SmapleProductPage = () => {
	const {isLoading, products} = useGlobalContext();

	const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
	console.log(products)
	return <>
		<Container className="my-5">
		<Row>
			{products.map((product) => (
				
					<Col sm={4} key={product.id}>
						<div className="product-grid m-3">
						<div className="product-img-section">
						<figure>
							<img className="w-100 h-100" src={product.img} alt={product.product_title}/>
						</figure>
						<Button variant="outline-dark" className="rounded-circle" onClick={handleShow}>
				               <i className="fa-regular fa-heart fa-lg"></i>
			              </Button>
						</div>
						<div className="product-details px-3 pt-3 pb-1">
						<h4>seersucker-camp-shirt-in-white</h4>
						<p><span data-currency="RS"> Rs.</span>{product.price}</p>
						</div>
						</div>
					</Col>
					
				
				))}
			</Row>
		</Container>
<AddToCartModal handleClose={handleClose} handleShow={handleShow}/>
		
	</>
}

export default SmapleProductPage