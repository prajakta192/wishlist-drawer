const iWishUrl = 'https://api.myshopapps.com/iwish/V1';
// var iWishCust = parseInt(window.iwish.cust);
const c_code = Shopify.country;

var iWishlist = localStorage.iWishlist ? new Map(JSON.parse(localStorage.iWishlist)) : new Map();
let iWishCust = window.iwish.cust !== '' ? parseInt(window.iwish.cust) : 0;

async function requestToSever(page, body, method = 'POST') {
 //debugger;
  const url = iWishUrl + '/' + page;
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      domain: window.iwish.shop,
      Authorization: ''
    },
    body: new URLSearchParams(body),
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
function getWishlist(){
	return iWish.getWishlist();
}
function getCounter() {
	return iWish.getCounter();
}
function removeFromWishlist(pId, vId, catId=0) {
	let parentEl = document.querySelector('.iWishAddColl[data-variant="'+vId+'"]');
	if(parentEl !== null){
	iWish.setIwishRemoved(parentEl);	
}
	return iWish.iwishRemove(vId, pId, catId=0);
}
function updateWishlist(pId, vId, qty=null, catId=null) {
	debugger;
	if(iWishCust>0) {
    	let data = '';
	    if(qty!=null) {
        	data = "customer_id="+iWishCust+"&product_id="+pId+"&variant_id="+vId+"&product_qty="+qty;
	    }
	    else if(catId!=null) {
	        data +=	"customer_id="+iWishCust+"&product_id="+pId+"&variant_id="+vId+"&category_id="+catId;
	    }
		return data!='' ? requestToSever("updateWishlist", data,'PUT') : false;
	}
}
async function fetchWishlist(limit=10, page=1, catId=0) {
  debugger;
	if (iWishCust > 0) {
    let data = await catId != 0 ? 'category_id=' + catId +'&c_code=' + c_code : 'category_id=' + 0 +'&c_code=' + c_code;
    return await requestToSever(
      'fetchWishlistData/' + iWishCust + '?page=' + page + '&limit=' + limit,
      data,
      'POST'
    );
  }
	else {
		let data = await "wishlist=" + getWishlist() +'&c_code=' + c_code;
    let res = await requestToSever('fetchWishlistDataWithoutLogin/', data, 'POST');
    let totalCount = await getCounter();
    res = await Object.assign(res,{total_records : totalCount});
    console.log(res)
    return await res
	}
}
function fetchCategory() {
	let data = "";
	return requestToSever("fetchCategory/"+iWishCust, data, 'POST');
}
function addCategory(catName) {
	// console.log(catName)
	let data = "category_name="+catName;
	return requestToSever("addCategory/"+iWishCust, data, 'POST');
}
function updateCategory(catId, catName) {
	// console.log(catId, catName)
	let data = "category_id="+catId+"&category_name="+catName;
	return requestToSever("updateCategory/"+iWishCust, data, 'PUT');
}
function removeCategory(catId) {
	let data = "category_id="+catId;
	return requestToSever("removeCategory/"+iWishCust, data, 'POST');
}

//get the cart_counter
let cart_count = window.iwish.cart_counter
// add product to cart
 function addToCart (vId,quantity){
	 const data = {'items': [{
			  	 'id': vId,
			     'quantity': quantity
			  }]}
			
     return fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
    			if(typeof cart_count !== undefined && cart_count !== ''){
    			getAllCartData();    	
    	}
    	 return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
      return error
    });
}
 
//add all to cart
function addAllToCart (products){
const data = {'items':products}
     return fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
    			if(typeof cart_count !== undefined && cart_count !== ''){
    			getAllCartData();
    		}
    	 return response.json();

    })
    .catch((error) => {
      console.error('Error:', error);
      return error
    });
}

//get total cart data
async function getAllCartData() {
	  return await fetch(window.Shopify.routes.root + 'cart.js', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
     .then(data => {
     			const cartCounterParent = document.querySelectorAll(cart_count);
     			cartCounterParent.forEach((item)=> {
     				item.innerHTML = data.item_count;
     		})
     })
    .catch((error) => {
      console.error('Error:', error);
      return error
    });
}

//format money
function moneyFormat (price){
  // debugger;
      let result;
      let format  = window.iwish.money_format;
       if (window.iwish.money_class !== undefined) {
        format = new DOMParser().parseFromString(format, "text/xml");
        format.firstChild.className = `${window.iwish.money_class}`
        format = format.activeElement.outerHTML;
     }
     //console.log(format)
      const precisionPrice = parseFloat(price).toFixed(2);
      const activeCurrency = window.iwish.currency;
      result  = Shopify.formatMoney(precisionPrice,format)
      return result
  }