
import React, {useState} from 'react'
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import WishlistDrawerPage from './pages/WishlistDrawerPage';
import data from './data'
import {Container} from 'react-bootstrap'

function App() {
  //State for cart drawer
    const [isOpen, setIsOpen] = useState(false);
    const openCart = () => {
        setIsOpen(true)
    }
    const closeCart = () => {
        setIsOpen(false)
    }
const [iWishCnt, setiWishCnt] = useState(null);
const addToWishlist = () => {
    console.log('added to wishlist');
    //iWishCnt++;
    setiWishCnt(iWishCnt + 1);
  }

  return (
    <Container fluid className='p-0 overflow-hidden'> 
     <Header openCart={openCart} iWishCnt={iWishCnt}/>
        <section className='d-flex mt-5'>
        
     {
      data.products.map((product) => (
           <ProductsPage key={product.id} product={product} addToWishlist={addToWishlist} iWishCnt={iWishCnt}/>
        ))
     }
    
       </section>
      <WishlistDrawerPage isOpen={isOpen} closeCart={closeCart} iWishCnt={iWishCnt}/>
    </Container>
  );
}

export default App;
