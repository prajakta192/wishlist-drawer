const iWishUrl = 'https://api.myshopapps.com/iwish/V1';

let iWishlist = localStorage.iWishlist
  ? new Map(JSON.parse(localStorage.iWishlist))
  : new Map();
let iWishCust = window.iwish.cust !== '' ? parseInt(window.iwish.cust) : 0;
async function requestToSever(page, body, method = 'POST') {
  const url = iWishUrl + '/' + page;
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      domain: window.iwish.shop,
      Authorization: '',
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
function getWishlist() {
  return JSON.parse(iWishlist);
}
function setWishlist() {
  localStorage.iWishlist = JSON.stringify(Array.from(iWishlist));
}
function getCounter() {
  return iWishlist.size;
}
function isInWishlist(vId) {
  return iWishlist.has(vId) ? true : false;
}
function addToWishlist(pId, vId, qty = 1, catId = 0) {
  if (!isInWishlist(vId)) {
    iWishlist.set(vId, qty);
    setWishlist();
    if (iWishCust > 0) {
      let data =
        'customer_id=' +
        iWishCust +
        '&product_id=' +
        pId +
        '&variant_id=' +
        vId +
        '&product_qty=' +
        qty +
        '&category_id=' +
        catId;
      return requestToSever('addToWishlist', data, 'POST');
    }
  }
}
function removeFromWishlist(pId, vId, catId = 0) {
  if (isInWishlist(vId)) {
    iWishlist.delete(vId);
    setWishlist();
    if (iWishCust > 0) {
      let data =
        'customer_id=' +
        iWishCust +
        '&product_id=' +
        pId +
        '&variant_id=' +
        vId +
        '&category_id=' +
        catId;
      return requestToSever('removeWishlist', data, 'POST');
    }
  }
}
function fetchWishlist(limit = 10, page = 1, catId = 0) {
  if (iWishCust > 0) {
    let data = catId != 0 ? 'category_id=' + catId : '';
    return requestToSever(
      'fetchWishlistData/' + iWishCust + '?page=' + page + '&limit=' + limit,
      data,
      'POST'
    );
  }
}
function fetchCategory() {
  let data = '';
  return requestToSever('fetchCategory/' + iWishCust, data, 'POST');
}
function addCategory(catName) {
  console.log(catName);
  let data = 'category_name=' + catName;
  return requestToSever('addCategory/' + iWishCust, data, 'POST');
}
function updateCategory(catId, catName) {
  console.log(catId, catName);
  let data = 'category_id=' + catId + '&category_name=' + catName;
  return requestToSever('updateCategory/' + iWishCust, data, 'POST');
}
function removeCategory(catId) {
  console.log('delete');
  let data = 'category_id=' + catId;
  return requestToSever('removeCategory/' + iWishCust, data, 'POST');
}
