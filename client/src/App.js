
import React, {useState, useEffect} from 'react'
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
 const[wishlist, setWishlist] = useState([])

const addToWishlist = (product) => {
    //console.log([...wishlist,product]);
  setWishlist([...wishlist, product]);
}
useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
 
  return (
    <Container fluid className='p-0 overflow-hidden'> 
     <Header openCart={openCart} wishlist={wishlist}/>
        <section className='d-grid mt-5' style={{gridTemplateColumns:'repeat(2, 1fr)'}}>
        
     {
      data.products.map((product) => (
           <ProductsPage key={product.id} product={product} addToWishlist={addToWishlist} wishlist={wishlist}/>
        ))
     }
    
       </section>
      <WishlistDrawerPage isOpen={isOpen} closeCart={closeCart} wishlist={wishlist} setWishlist={setWishlist}/>
    </Container>
  );
}

export default App;
