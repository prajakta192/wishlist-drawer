
import {createContext, useContext, useReducer,useEffect} from 'react'
import {wishlistReducer, fetchVariantData} from '../reducer/ProductReducer'
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
	cart :[],
	iWishList : []
}
 
const ContextProvider = ({children}) => {

const[state, dispatch] = useReducer(wishlistReducer, initialValue)
//console.log(state.cart);

	return <WishlistContext.Provider value={{state, dispatch}}>{children}</WishlistContext.Provider>
}


const useWishlistContext = () => {
	return useContext(WishlistContext)
}


export {ContextProvider, useWishlistContext}