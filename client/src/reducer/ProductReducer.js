
const ProductReducer = (state, action) => {
		switch(action.type){
		case "LOADING_PRODUCTS" : 
			return{
				...state,
				isLoading : true
			}	
		case "GET_ALL_PRODUCTS" :
			return{
				...state,
				isLoading : false,
				products : action.payload
			}	
		case "PRODUCT_NOT_FOUND" : 
			return{
				...state,
				isLoading : false,
				isError : true
			}	
		default : 
			return state
		}
}

export default ProductReducer