
import React, {useEffect, useState} from 'react'
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import WishlistDrawerPage from './pages/WishlistDrawerPage';
import {Container} from 'react-bootstrap'
// import{useWishlistContext} from './context/ProductContext'


function App() {
    //const{state : {iWishList}} = useWishlistContext();
    const[products, setProducts] = useState([])
    const[categories, setCategories] = useState([])
async function fetchWishlistData() {
    const res = await window.fetchWishlist(10,1)
    const data = await res.result
    //console.log(data)
    setProducts(data)
}
 
//   function groupBy(array, property) {
//     debugger;
//     const arr = [];
// array.reduce((acc, curr) => {
//   if(acc.indexOf(curr.position) === -1) {
//     acc.push(curr.position);
//     arr.push(curr);
//   }
//   return arr;
// }, [])

// console.log(arr)
// }


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
 
 
console.log(categories)


useEffect( () => {
fetchWishlistData();

 }, [])

//console.log('product',products)

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
