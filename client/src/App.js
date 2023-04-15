
import React, {useEffect, useState} from 'react'
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import WishlistDrawerPage from './pages/WishlistDrawerPage';
import {Container} from 'react-bootstrap'
// import{useWishlistContext} from './context/ProductContext'


function App() {
    //const{state : {iWishList}} = useWishlistContext();
    const[products, setProducts] = useState([])

async function fetchWishlistData() {
    const res = await window.fetchWishlist(10,1)
    const data = await res.result
    console.log(data)
    setProducts(data)
}

useEffect( () => {
fetchWishlistData()
 }, [])

//console.log('product',products)

  //State for cart drawer
    const [isOpen, setIsOpen] = useState(false);
    const openCart = () => {
        setIsOpen(true);
        fetchWishlistData();
        window.fetchCategory()
    }
    const closeCart = () => {
        setIsOpen(false)
    }


 return (
    <Container fluid className='p-0 overflow-hidden'> 
     <Header openCart={openCart}/>
      <section className='d-grid mt-5' style={{gridTemplateColumns:'repeat(2, 1fr)'}}>
        
     {
      products.map((product,id) => (
           <ProductsPage key={id} product={product} openCart={openCart}/>
        ))
     }
    
       </section>
      <WishlistDrawerPage isOpen={isOpen} closeCart={closeCart} products={products}/>  
      <div>
      
      </div>
    </Container>
  );
}

export default App;
