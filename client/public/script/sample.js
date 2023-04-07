



const iWishUrl = "https://api.myshopapps.com/iwish/V1";
var iWishlist = localStorage.iWishlist ? new Map(JSON.parse(localStorage.iWishlist)) : new Map();
var iWishCust = parseInt(window.iwish_cid);
async function requestToSever(page, body, method='POST')  {
	
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
		//console.log(data.result);
		return data;
		
	} catch (error) {
		console.error(error);
		return error;
	}
}
 function getWishlist(){
		//return JSON.parse(iWishlist);
 		console.log(iWishlist)
	}


	function setWishlist() {
		
		localStorage.iWishlist = JSON.stringify(Array.from(iWishlist));
		console.log(localStorage.iWishlist);
	}

	function getCounter() {
		return iWishlist.size;
	}

	function isInWishlist(vId) {
		
		return iWishlist.has(vId) ? true : false;
	}

	function addToWishlist(pId, vId, qty=1, catId=0, openCart) {
		
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
		if(isInWishlist(vId)) {
			iWishlist.delete(vId);
			setWishlist(); // update storage
				
			if(iWishCust>0) {
				let data = "customer_id="+iWishCust+"&product_id="+pId+"&variant_id="+vId+"&category_id="+catId;
				return requestToSever("removeWishlist", data,'POST');
			}
		}
	}

	 function fetchWishlist(limit=10, page=1, catId=null) {
	
	if(iWishCust>0) {
		let data = catId!=null ? "category_id="+catId : '';
		return requestToSever("fetchWishlistData/"+iWishCust+"?page="+page+"&limit="+limit, data,'POST');
	}
}
