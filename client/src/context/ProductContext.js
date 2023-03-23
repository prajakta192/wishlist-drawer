
import {createContext, useContext, useEffect, useReducer} from 'react'
import axios from 'axios'
import reducer from '../reducer/ProductReducer'

//creating context
const GlobalProductContext = createContext()


//providing the context
const ProductContextProvider = ({children}) => {
//All logic goes Herereeeeeeeeeeeee
	 const initialValue = {
	 	isLoading : false,
	 	isLogin : false,
		showModal : false,
	 	products : []
	 }

	 //Reduce for sate management
     const [state, dispatch] = useReducer(reducer, initialValue);
	 
	 const GetAllProducts = async() => {
	 	dispatch({type:"LOADING_PRODUCTS"})
	 	console.log('isLoading')
	 	try{
	 	const res = await axios.get('./data.json');
	 	const products = await res.data.products
	 	//console.log(products)
	 	dispatch({type:"GET_ALL_PRODUCTS", payload:products})
	    }
	    catch(error){
	    dispatch({type:"PRODUCT_NOT_FOUND"})
	    console.log(error.message)
	    }
	 }

	 useEffect(() => {
	 	GetAllProducts();
	 },[])


	//should always return the context wrapped in Provider
	 return <GlobalProductContext.Provider value={{...state}}>{children}</GlobalProductContext.Provider>
}

//consuming the context
const useGlobalContext = () => {
	return useContext(GlobalProductContext)
}

export{ProductContextProvider, useGlobalContext}