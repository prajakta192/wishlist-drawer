class NowInStock {
	constructor() {
		this.iStockUrl = 'https://test.myshopapps.com/ajax_istock';
		this.varSelector = window.istock.variant_selector!='' ? window.istock.variant_selector : '[name=id]';
		this.optSelector = window.istock.option_selector!='' ? window.istock.option_selector : '';
		this.allowPreorder = window.istock.allow_preorder;
		this.allowResubscribe = window.istock.allow_resubscribe;
		this.isProductPage = window.istock.is_product_page;
		this.shopInfo = sessionStorage.shopInfo ? JSON.parse(sessionStorage.shopInfo) : {};
		this.availableMsg = window.istock.available_msg;
		this.logs = typeof window.istock.logs !== 'undefined' && window.istock.logs!='' ? window.istock.logs : false;
		this.availDates = {};
		this.iStockProducts = {};
		this.vIdOld = 0;
	}

	findAncestor (el, cls) {
		while (el.parentElement) {
			el = el.parentElement;
			if(el.querySelectorAll(cls).length > 0) {
				return el.querySelector(cls);
			}
		}
		return false;
	}

	iStockValidateEmail(emailId) {
		const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(emailId);
	}

	iStockUrlParam(pname) {
		const results = new RegExp('[\?&]' + pname + '=([^&#]*)').exec(window.location.href);
		if(results!=null) {
			return results[1] || 0;
		}
		return results;
	}

	async requestToSever(page, body) {
		const url = this.iStockUrl+"/"+page;
		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/x-www-form-urlencoded', Shop: window.istock.shop},
			body: new URLSearchParams(body)
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
	
	async getAvailDates(product, vId, iStockWrapper) {
		if(this.logs) { console.log('getAvailDates :: sessionStorage :', this.shopInfo); }
		let pId = product.id;
		let data = "shopId="+this.shopInfo.istShopId+"&pid="+pId;
		let res = await this.requestToSever("get-availability.php", data);
		this.availDates[pId] = res;
		if(vId!==null) { this.istockNotifyShow(product, vId, iStockWrapper); }
	}	
	
	istockgetProduct(handle, iStockWrapper, vId=null) {
		if(this.logs) { console.log("istockgetProduct :: " + handle); }
		let getProduct = fetch(window.Shopify.routes.root + 'products/'+handle+'.js')
		.then(response => response.json())
		.then(product => {
			this.iStockProducts[product.handle] = product;
			if(this.availableMsg=='') { this.getAvailDates(product, vId, iStockWrapper); }			
			else { if(vId!==null) { this.istockNotifyShow(product, vId, iStockWrapper); } }
		});
	}

	istockGetVariant(vId, iStockVariants) {
		let istockGetVariant = false;
		for (let key in iStockVariants) {
			if (iStockVariants[key]['id'] == vId) {
				istockGetVariant = iStockVariants[key];
				break;
			}
		}
		return istockGetVariant;
	}

	iStockResubscribe(iStockWrapper) {
		let emailId = decodeURIComponent(this.iStockUrlParam('customer'));
		let emailEle = iStockWrapper.querySelector('.iStock-email-id');
		let emailbtnEle = iStockWrapper.querySelector('.iStock-notify-btn');
		if(this.iStockValidateEmail(emailId)) {
			emailEle.value = emailId;
			this.istockNotifyMe(emailbtnEle);
		}
		else {
			emailEle.setAttribute('type', 'text');
			emailEle.value = emailId;
			this.istockNotifyMe(emailbtnEle, emailId);
			emailEle.setAttribute('type', 'email');
			emailEle.value = '';
		}
		let sPageURL = window.location.href;
		let sUpdateUrl = sPageURL.split('?');
		window.history.replaceState(null, null, sUpdateUrl[0]);
	}
	
	async istockSetVistited(vId) {
		let emailId = decodeURIComponent(this.iStockUrlParam('customer'));
		if(vId!=null && emailId!=null && this.iStockValidateEmail(emailId)) {
			if(this.logs) { console.log('istockSetVistited : '+emailId); }
			let data = "shopId="+this.shopInfo.istShopId+"&cust="+emailId+"&vid="+vId;
			let res = await this.requestToSever("set_visited.php", data);
		}
	}

	istockNotifyShow(product, vId, iStockWrapper) {
		let pId = product.id;
		let istockShowNotify = false;
				
		if(this.shopInfo.istExcludeProd.indexOf(pId)>=0) {
			if(this.logs) { console.log('product excluded ::'+pId); }
		}
		else if(this.shopInfo.istExcludeVar.indexOf(vId)>=0) {
			if(this.logs) { console.log('variant excluded ::'+vId); }
		}
		else {
			let iStockVariant = this.istockGetVariant(vId, product.variants);
			if(iStockVariant) {
			if(this.allowPreorder) {
				let prodTag = product.tags;
				let istockPreorderTag = "istock-preorder";
				let istockPreorderVarTag = istockPreorderTag+'-'+iStockVariant.sku;
				if(prodTag.indexOf(istockPreorderTag)!=-1) { istockShowNotify = true; }
				else if (prodTag.indexOf(istockPreorderVarTag)!=-1) { istockShowNotify = true; }
				else if(iStockVariant.available==false) { istockShowNotify = true; }
			}
			else if(iStockVariant.available==false) { istockShowNotify = true; }
			}
		}
		
		console.log('istockNotifyShow : '+vId+' : '+istockShowNotify);
		if(istockShowNotify) {
			// show Availibility
			let showAvailability = 'none';
			let showAvailabilityLbl = 'none';
			if(this.availableMsg!='') { // set default msg
			  showAvailabilityLbl = 'inline';
			  showAvailability = 'block'; 
			  if(iStockWrapper.querySelector(".iStock-availability > span").innerHTML == '') {
				iStockWrapper.querySelector(".iStock-availability > span").innerHTML = this.availableMsg;
			  }
			}
			else if(typeof this.availDates[pId] !=='undefined' && typeof this.availDates[pId][vId] !=='undefined') {
				if(this.availDates[pId][vId]['type']==0) { showAvailabilityLbl = 'inline'; }
				showAvailability = 'block';
				iStockWrapper.querySelector(".iStock-availability > span").innerHTML = this.availDates[pId][vId]['val'];
			}
			iStockWrapper.querySelector(".iStock-availability > label").style.display = showAvailabilityLbl;
			iStockWrapper.querySelector(".iStock-availability").style.display = showAvailability;

			// show iStock-wrapper
			iStockWrapper.style.display = 'block';
			
			if (typeof istockNotifyShowFn !== "undefined" && typeof istockNotifyShowFn === 'function') { istockNotifyShowFn(); }
			
			// Resubscribe to Product
			if(this.allowResubscribe) {
				this.iStockResubscribe(iStockWrapper);
			}
		}
		else {
			if(!Shopify.designMode) {
				iStockWrapper.querySelector(".iStock-availability > span").innerHTML = '';
				iStockWrapper.style.display = 'none';
			}
		}
	}

	async istockNotifyMe(istockBtnObj, encyEmail=null) {
	  let iStockWrapper = this.findAncestor(istockBtnObj, ".iStock-wrapper");
	  let msgElm = iStockWrapper.querySelector('.iStock-msg');
	  msgElm.classList.remove('iStock-error');
	  msgElm.style.display = "none";

	  istockBtnObj.classList.add('disabled');
	  istockBtnObj.setAttribute('disabled', 'disabled');

	  let emailId = iStockWrapper.querySelector('.iStock-email-id').value;
	  if(encyEmail == null && !this.iStockValidateEmail(emailId)) {
		msgElm.innerHTML = window.istock.error_msg;
		msgElm.classList.add('iStock-error');
		msgElm.style.display = 'block';
	  }
	  else {
	  	let productHandle = iStockWrapper.getAttributeNode("data-handle").value;
	  	let iStockProduct = this.iStockProducts[productHandle];
	  	let varSelector = this.findAncestor(istockBtnObj, this.varSelector);
		let vId = varSelector.value;
		let iStockVariant = this.istockGetVariant(vId, iStockProduct.variants);

		let data = "shopId="+this.shopInfo.istShopId+"&cust="+emailId+"&vid="+iStockVariant.id+"&pid="+iStockProduct.id+"&vTitle="+iStockVariant.title+"&pTitle="+iStockProduct.title+"&shopLocale="+window.Shopify.locale;
		let res = await this.requestToSever("add_notify.php", data);
		if(res.insertId!=0) {
			msgElm.innerHTML = window.istock.success_msg;
			msgElm.style.display = 'block';
			iStockWrapper.querySelector('.iStock-email-id').value = '';
		}
		if (typeof iStockAddFn !== 'undefined' && typeof iStockAddFn === 'function') { iStockAddFn();}
	  }
	  setTimeout(function() {
		  istockBtnObj.classList.remove("disabled");
		  istockBtnObj.removeAttribute("disabled");
	  }, 200);
	}

	setBlockValues() {
	  let iStockCnt = document.querySelectorAll(".iStock-wrapper--no-cnt");
	  if(iStockCnt.length > 0) {
		  if(typeof window.istock.title !== 'undefined') {
			iStockCnt.forEach(el => {
			  el.querySelector('h2').innerHTML = window.istock.title;
			  el.querySelector('.iStock-notifyTxt').innerHTML = window.istock.description;
			  el.querySelector('.iStock-availability label').innerHTML = window.istock.available_on;
			  el.querySelector('.iStock-availability span').innerHTML = window.istock.available_msg;
			  el.querySelector('.iStock-email-id').setAttribute('placeholder', window.istock.email_addr);
			  el.querySelector('.iStock-notify-btn span').innerHTML = window.istock.notify_me;
			  if(window.istock.inp_class!='') {
			  el.querySelector('.iStock-email-id').classList.remove('iStock-inp-1');
			  el.querySelector('.iStock-email-id').classList.add(window.istock.inp_class);
			  }
			  if(window.istock.theme_btn_class!='') {
			  el.querySelector('.iStock-notify-btn').classList.remove('iStock-btn-1');
			  el.querySelector('.iStock-notify-btn').classList.add(window.istock.theme_btn_class);
			  }
			});
		  }
		  else {
			iStockCnt.forEach(el => {
				el.remove();
			});
		  }
	  }
	}

	async init() {
		if(this.logs) { console.log("istock_init..."); }
		if (Object.keys(this.shopInfo).length==0 || this.shopInfo.istShop != Shopify.shop) {
			let data = "shop="+Shopify.shop;
			let res = await this.requestToSever("istock_init.php", data);
		  	if(res.length==0) { return false; }
			sessionStorage.shopInfo = JSON.stringify(res);
			this.shopInfo = res; 
			if(this.logs) { console.log('sessionStorage :', this.shopInfo); }
		}
	  
		this.setBlockValues();

		// istockNotify btn click
		let iStockBtn = document.querySelectorAll(".iStock-notify-btn");
		if(iStockBtn.length > 0) {
			iStockBtn.forEach(el => el.addEventListener('click', event => {
				this.istockNotifyMe(el);
			}));
		}

		if(document.querySelectorAll('.iStock-wrapper').length == 0) {
			return;
		}
		
		let varSelector = document.querySelectorAll(this.varSelector);
		// get products data
		if(varSelector.length > 0) {
			let oldpHandle = '';
			varSelector.forEach(elm => {
			  //let elm = document.querySelector(this.varSelector);
			  let iStockWrapper = this.findAncestor(elm, ".iStock-wrapper");
			  let productHandle = iStockWrapper.getAttributeNode("data-handle").value;
			  if(productHandle==oldpHandle) { return; }
			  oldpHandle = productHandle;
			  if(productHandle !== 'undefined' && typeof this.iStockProducts[productHandle] == 'undefined' ) {
				let vId = elm.value;
				this.istockgetProduct(productHandle, iStockWrapper, vId);
				if(this.isProductPage) { this.istockSetVistited(vId); }
			  }
			});
		}

		if (this.optSelector != '') {
			// on option selector change			
            let selectorElmAll = this.optSelector.split(", ");
			let selectorElm = document.querySelectorAll(selectorElmAll);
			selectorElm.forEach(el => {
                if(el.tagName == 'INPUT' || el.tagName == 'SELECT' || el.tagName == 'OPTION') {
                  el.addEventListener('change', event => {
                  setTimeout(()=> {
                    if(this.logs) { console.log(el.tagName + ' change'); }
					let varSelector = this.findAncestor(el, this.varSelector);
					let vId = varSelector.value;
					let iStockWrapper = this.findAncestor(varSelector, ".iStock-wrapper");
					let productHandle = iStockWrapper.getAttributeNode("data-handle").value;
					this.istockNotifyShow(this.iStockProducts[productHandle], vId, iStockWrapper);
				  }, 300);
    			  });
                }
                else {
                  el.addEventListener('click', event => {
                  setTimeout(()=> {
                    if(this.logs) { console.log(el.tagName + ' click'); }
					let varSelector = this.findAncestor(el, this.varSelector);
					let vId = varSelector.value;
					let iStockWrapper = this.findAncestor(varSelector, ".iStock-wrapper");
					let productHandle = iStockWrapper.getAttributeNode("data-handle").value;
					this.istockNotifyShow(this.iStockProducts[productHandle], vId, iStockWrapper);
				  }, 300);
    			  });
                }
			});
		}
		else {
			varSelector.forEach(el => el.addEventListener('change', event => {
    			if(this.logs) { console.log('variant change'); }
				let varSelector = event.target;
				let vId = varSelector.value;
				let iStockWrapper = this.findAncestor(varSelector, ".iStock-wrapper");
				let productHandle = iStockWrapper.getAttributeNode("data-handle").value;				
				this.istockNotifyShow(this.iStockProducts[productHandle], vId, iStockWrapper);
			}));
		}
	}
}

var iStock = new NowInStock();
setTimeout(()=> {
	iStock.init();
}, 300);
