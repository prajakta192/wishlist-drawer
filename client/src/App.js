
import React, {useState} from 'react'
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import WishlistDrawerPage from './pages/WishlistDrawerPage';
import data from './data'
import {Container} from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  //State for cart drawer
    const [isOpen, setIsOpen] = useState(false);
    const openCart = () => {
        setIsOpen(true)
    }
    const closeCart = () => {
        setIsOpen(false)
    }
 const[wishlist, setWishlist] = useState([]);



const addToWishlist = (product) => {
  debugger;
    //console.log([...wishlist,product]);
  setWishlist([...wishlist, product])
  return localStorage.setItem("wishlist", JSON.stringify(wishlist));
    
}

  return (
    <Container fluid className='p-0 overflow-hidden'> 
     <Header openCart={openCart} wishlist={wishlist}/>
     <Routes>
        
          <Route path='/signin' element={<LoginPage/>}/>
          <Route path='/payment' element={<PaymentPage/>}/>
     <Route path='/' element={
        <section className='d-grid mt-5' style={{gridTemplateColumns:'repeat(2, 1fr)'}}>
        
     {
      data.products.map((product) => (
           <ProductsPage key={product.id} product={product} addToWishlist={addToWishlist} wishlist={wishlist} setWishlist={setWishlist}/>
        ))
     }
    
       </section>}/>
       </Routes>
      <WishlistDrawerPage isOpen={isOpen} closeCart={closeCart} wishlist={wishlist}/>     
      
    </Container>
  );
}

export default App;
