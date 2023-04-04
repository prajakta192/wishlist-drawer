
import {createContext, useContext, useReducer,useEffect} from 'react'
import {wishlistReducer} from '../reducer/ProductReducer'
import axios from 'axios'

const WishlistContext = createContext()

const getLocalWishlistData = () => {
	const localWishlist = JSON.parse(localStorage.getItem('Wishlist'));
	if(localWishlist === []){
		return [];
	}
	else{
			return localWishlist
		}
}

const initialValue = {
	cart : [],
}
 
 //fetching data 
const GetVariantData = async () => {
	try{
	const res = await axios.get('./variant-data.json');
	const data = await res.data
	console.log(data);
	localStorage.setItem('iWishlist' , JSON.stringify(data))
}
catch(err){
	console.log(err.message)
}
}
 

const ContextProvider = ({children}) => {

useEffect(() => {
 	GetVariantData()
 }, [])

const[state, dispatch] = useReducer(wishlistReducer, initialValue)
//console.log(state.cart.variant_id);

	return <WishlistContext.Provider value={{state, dispatch}}>{children}</WishlistContext.Provider>
}

const useWishlistContext = () => {
	return useContext(WishlistContext)
}


export {ContextProvider, useWishlistContext}