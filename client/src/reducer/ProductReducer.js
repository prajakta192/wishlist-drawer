
export const wishlistReducer = (state, action) => {
		switch(action.type){
		case "ADD_TO_WISHLIST" : 
			const {id} = action.payload;
			const isItemExist = state.cart.find((item) => item.id === id)

				return{
					...state,
					cart:[...state.cart, {...action.payload, qty:1}]
				}
			
		default : 
			return state
		}
}


