
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
					warning:true,
					...state,
					cart:[...state.cart]
				}
					
			}
			else{
					return{
					...state,
					cart:[...state.cart, {...action.payload, qty:1}]
				}
				 
				}
			// const {id} = action.payload;
			// const isItemExist = state.cart.find((item) => item.id === id)
		
			
			
		default : 
			return state
		}
}


