
import React, {useEffect, useState,useReducer} from 'react'
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import WishlistDrawerPage from './pages/WishlistDrawerPage';
import {Container,Button} from 'react-bootstrap'
import{fetchVariantData} from './reducer/ProductReducer'
import {getCounter} from './script/sample'
import{useWishlistContext} from './context/ProductContext'
import axios from 'axios'

function App() {
    const{state : {iWishList}} = useWishlistContext();
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
}
catch(err){
  dispatch({type:'FETCH_FAIL', payload:err.message})
  console.log(err.message)
}
}

useEffect(() => {
  GetVariantData();

 }, [])

  //State for cart drawer
    const [isOpen, setIsOpen] = useState(false);
    const openCart = () => {
        setIsOpen(true)
    }
    const closeCart = () => {
        setIsOpen(false)
    }


 return (
    <Container fluid className='p-0 overflow-hidden'> 
     <Header openCart={openCart}/>
       <Button className='mt-3' onClick={() => getCounter(iWishList)}>get iWish count</Button>
        <section className='d-grid mt-5' style={{gridTemplateColumns:'repeat(2, 1fr)'}}>
     {products.map((product,id) => (
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
