
import {createContext, useContext, useReducer,useEffect} from 'react'
import {wishlistReducer} from '../reducer/ProductReducer'

const WishlistContext = createContext()

const initialValue = {
	cart : [localStorage.getItem('wishlist')?JSON.parse(localStorage.getItem('wishlist')) : []]
}
 
const ContextProvider = ({children}) => {

const[state, dispatch] = useReducer(wishlistReducer, initialValue)
console.log('context', state.cart);

useEffect(() => {
	localStorage.setItem('wishlist', JSON.stringify(state.cart));
},[state.cart])


	return <WishlistContext.Provider value={{state, dispatch}}>{children}</WishlistContext.Provider>
}

const useWishlistContext = () => {
	return useContext(WishlistContext)
}


export {ContextProvider, useWishlistContext}