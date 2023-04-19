
const iWishUrl = "https://api.myshopapps.com/iwish/V1";
var iWishlist = localStorage.iWishlist ? new Map(JSON.parse(localStorage.iWishlist)) : new Map();
var iWishCust = parseInt(window.iwish_cid);
async function requestToSever(page, body, method='POST')  {
	debugger;
	const url = iWishUrl+"/"+page;
	//console.log(url)
	//console.log(new URLSearchParams(body));
	const options = {
		method: method,
		headers: {'Content-Type': 'application/x-www-form-urlencoded', domain: window.iwish_shop, Authorization:''},
		body: new URLSearchParams(body)
	};
	try {
		const response = await fetch(url, options);
		const data =  await response.json();
		console.log(url, data);
		return data;
		
	} catch (error) {
		console.error(error);
		return error;
	}
}
 	function getWishlist(){
 		//debugger;
		return JSON.parse(iWishlist);
 		//console.log(JSON.parse(iWishlist))
}


	function setWishlist() {
		//debugger;
		localStorage.iWishlist = JSON.stringify(Array.from(iWishlist));
		//console.log(localStorage.iWishlist);
	}

	function getCounter() {
		return iWishlist.size;
	}

	function isInWishlist(vId) {
		
		return iWishlist.has(vId) ? true : false;
}

	function addToWishlist(pId, vId, qty=1, catId=null, openCart) {
		
		if(!isInWishlist(vId)) {
			iWishlist.set(vId, qty);
			setWishlist(); // update storage
			
			console.log(iWishCust);
			if(iWishCust>0) {
				let data = "customer_id="+iWishCust+"&product_id="+pId+"&variant_id="+vId+"&product_qty="+qty+"&category_id="+catId;
				return requestToSever("addToWishlist", data,'POST');
				
			}
		}
		openCart;
}

	function removeFromWishlist(pId, vId, catId=null) {
		//debugger;
		if(isInWishlist(vId)) {
			iWishlist.delete(vId);
			setWishlist(); // update storage
			
			if(iWishCust>0) {
				let data = "customer_id="+iWishCust+"&product_id="+pId+"&variant_id="+vId+"&category_id="+catId;
				return requestToSever("removeWishlist", data,'POST');
				}
				//console.log(data)
		}
		
	}

	function fetchWishlist(limit=10, page=1, catId=null) {
		//debugger;
	if(iWishCust>0) {
		let data = catId!=null ? "category_id="+catId : '';
		return requestToSever("fetchWishlistData/"+iWishCust+"?page="+page+"&limit="+limit, data,'POST');
	}
}

	function fetchCategory() {
		debugger;
		console.log('fetch cat')
		let data = "";
		return requestToSever("fetchCategory/"+iWishCust, data, 'POST');
}

	function addCategory(catName) {
		console.log(catName)
		let data = "category_name="+catName;
		return requestToSever("addCategory/"+iWishCust, data, 'POST');
}

	function updateCategory(catId, catName) {
		debugger;
		console.log(catId, catName)
		let data = "category_id="+catId+"&category_name="+catName;
		return requestToSever("updateCategory/"+iWishCust, data, 'POST');
}

	function removeCategory(catId) {
		console.log('delete')
		let data = "category_id="+catId;
		return requestToSever("removeCategory/"+iWishCust, data, 'POST');
}


  
  
 