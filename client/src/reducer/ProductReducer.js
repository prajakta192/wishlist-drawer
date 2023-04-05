
export const wishlistReducer = (state, action) => {
	
		switch(action.type){
		case "ADD_TO_WISHLIST" : 
			let isExist = false;
			//console.log(action.payload.variant.id)
			let variant_id = action.payload.variant.id;
			let quantity =  action.payload.variant.inventoryQuantity;
			
			state.cart.map((item) => {
				if(item.id === action.payload.id)
					isExist = true
			})
			if(isExist){
				return{
					...state,
					cart:[...state.cart],
					iWishList:[...state.iWishList]
				}
			}
			else{
					return{
					...state,
					cart:[...state.cart, {...action.payload}],
					iWishList:[...state.iWishList, [variant_id, quantity]]
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

//RDUCER for fetch Request

export const fetchVariantData = (state, action) => {
	switch(action.type){
	case 'FETCH_REQUEST':
		return{
			...state,
			loading:true
		}
	case "FETCH_SUCCESS" : 
		return{
			loading:false,
			...state,
			products:action.payload
		}
	case 'FETCH_FAIL':
		return{
			loading:false,
			...state,
			error:action.payload
		}
	default:
		return state
	}
}
