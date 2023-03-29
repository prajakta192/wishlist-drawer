
import {createContext, useContext, useReducer,} from 'react'
import {wishlistReducer} from '../reducer/ProductReducer'

const WishlistContext = createContext()

const getLocalWishlistData = () => {
	const localWishlist = JSON.parse(localStorage.getItem('wishlist'));
	if(localWishlist === []){
		return [];
	}
	else{
			return localWishlist
		}
}
const initialValue = {
	cart : getLocalWishlistData(),
}
 
const ContextProvider = ({children}) => {

const[state, dispatch] = useReducer(wishlistReducer, initialValue)
console.log('context', state.cart);

	return <WishlistContext.Provider value={{state, dispatch}}>{children}</WishlistContext.Provider>
}

const useWishlistContext = () => {
	return useContext(WishlistContext)
}


export {ContextProvider, useWishlistContext}