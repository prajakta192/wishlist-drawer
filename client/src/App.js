
import React, {useEffect, useState} from 'react'
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import WishlistDrawerPage from './pages/WishlistDrawerPage';
import data from './data'
import {Container} from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom';
import {IconName} from 'react-icons/bi';

function App() {
  
  //State for cart drawer
    const [isOpen, setIsOpen] = useState(false);
    const openCart = () => {
        setIsOpen(true)
    }
    const closeCart = () => {
        setIsOpen(false)
    }

 // const[wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);

//add to cart with useState

// const addToWishlist = (product) => {
//   //debugger;
//     //console.log([...wishlist,product]);
//     let isExist = false;
    
//     wishlist.map((item) =>
//     { 
//       if(item.id === product.id)
//       isExist = true
//     })
//     if(isExist){
//       setWishlist([...wishlist])
//      setWarning(true);
//      setTimeout(() => {
//         setWarning(false)
//      },2000)
//     }else{

//       setWishlist([...wishlist, product])
//     }
// }
// useEffect(() => {
//   return localStorage.setItem("wishlist", JSON.stringify(wishlist));
// }, [wishlist])

  return (
    <Container fluid className='p-0 overflow-hidden'> 
     <Header openCart={openCart}/>
     <Routes>
     <Route path='/' element={
        <section className='d-grid mt-5' style={{gridTemplateColumns:'repeat(2, 1fr)'}}>
        
     {
      data.products.map((product) => (
           <ProductsPage key={product.id} product={product}/>
        ))
     }
    
       </section>}/>
       </Routes>
      <WishlistDrawerPage isOpen={isOpen} closeCart={closeCart}/>     
      
    </Container>
  );
}

export default App;
