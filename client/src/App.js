
import React, {useEffect, useState,useReducer} from 'react'
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import WishlistDrawerPage from './pages/WishlistDrawerPage';
import {Container,Button} from 'react-bootstrap'
import{useWishlistContext} from './context/ProductContext'


function App() {
    const{state : {iWishList}} = useWishlistContext();

    const[products, setProducts] = useState([])

useEffect( () => {
  async function fetchWishlistData() {
    const res = await window.fetchWishlist(10,1,0)
    const data = await res.result
    //console.log(data)
    setProducts(data)
}
fetchWishlistData()
 }, [])

console.log('product',products)

  //State for cart drawer
    const [isOpen, setIsOpen] = useState(false);
    const openCart = () => {
        setIsOpen(true);
    }
    const closeCart = () => {
        setIsOpen(false)
    }


 return (
    <Container fluid className='p-0 overflow-hidden'> 
     <Header openCart={openCart}/>
       <Button className='mt-3' onClick={() => window.getWishlist(iWishList)}>get iWish count</Button>
      <section className='d-grid mt-5' style={{gridTemplateColumns:'repeat(2, 1fr)'}}>
        
     {
      products.map((product,id) => (
           <ProductsPage key={id} product={product} openCart={openCart}/>
        ))
     }
    
       </section>
      <WishlistDrawerPage isOpen={isOpen} closeCart={closeCart}/>  
      <div>
      
      </div>
    </Container>
  );
}

export default App;
