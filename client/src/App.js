
import React, {useEffect, useState,useReducer} from 'react'
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import WishlistDrawerPage from './pages/WishlistDrawerPage';
// import data from './data'
import {Container} from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import {IconName} from 'react-icons/bi';
import{fetchVariantData} from './reducer/ProductReducer'

import axios from 'axios'

function App() {
  const [{loading,products,error}, dispatch] = useReducer(fetchVariantData, {
    loading:true,
    products:[],
    error:""
  })


//fetching data 
  const GetVariantData = async () => {
  dispatch({type:'FETCH_REQUEST'})
  try{
  const res = await axios.get('./variant-data.json');
  const data = await res.data
  //console.log(data);
  dispatch({type : 'FETCH_SUCCESS', payload:data.result})
  //localStorage.setItem('Wishlist' , JSON.stringify(data.result))
}
catch(err){
  dispatch({type:'FETCH_FAIL', payload:err.message})
  console.log(err.message)
}
}

useEffect(() => {
  GetVariantData();

 }, [])
//console.log(products)

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
    
        <section className='d-grid mt-5' style={{gridTemplateColumns:'repeat(2, 1fr)'}}>
        
     {
     
      products.map((product,id) => (
           <ProductsPage key={id} product={product} openCart={openCart}/>
        ))
     }
    
       </section>
     
      <WishlistDrawerPage isOpen={isOpen} closeCart={closeCart}/>     
      
    </Container>
  );
}

export default App;
