
export const wishlistReducer = (state, action) => {
	
		switch(action.type){
		case "ADD_TO_WISHLIST" : 
			let isExist = false;
			state.cart.map((item) => {
				if(item.id === action.payload.id)
					isExist = true
			})
			if(isExist){
				return{
					...state,
					cart:[...state.cart]
				}
			}
			else{
					return{
					...state,
					cart:[...state.cart, {...action.payload}]
				}
				}
		
			case "REMOVE_PRODUCT" :
				const cart = state.cart.filter((item) => item.id !== action.payload.id) 
				console.log('reducer',cart);
				localStorage.setItem('wishlist', JSON.stringify(cart))
				return{
					...state,
					cart:[...cart]
				}
			
		default : 
			return state
		}
}

