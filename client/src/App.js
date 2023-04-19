
import React, {useEffect, useState} from 'react'
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import WishlistDrawerPage from './pages/WishlistDrawerPage';
import {Container} from 'react-bootstrap'

function App() {
    const[products, setProducts] = useState([])
    const[categories, setCategories] = useState([])
async function fetchWishlistData() {
    const res = await window.fetchWishlist(10,1)
    const data = await res.result
    setProducts(data)
}


async function fetchCategoryData() {
    debugger;
    const res = await window.fetchCategory();
    const catData = res.result;

    const arr = [];
    catData.reduce((acc, curr) => {
        debugger;
  if(acc.indexOf(curr.category_name) === -1) {
    acc.push(curr.category_name);
    arr.push(curr);
  }
  return acc;
}, [])
    setCategories(arr)
}

useEffect( () => {
fetchWishlistData();

 }, [])

  //State for cart drawer
    const [isOpen, setIsOpen] = useState(false);
    const openCart = () => {
        setIsOpen(true);
        fetchWishlistData();
        fetchCategoryData()
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
      <WishlistDrawerPage  categories={categories} setCategories={setCategories} isOpen={isOpen} closeCart={closeCart} products={products}/>  
      <div>
      
      </div>
    </Container>
  );
}

export default App;
