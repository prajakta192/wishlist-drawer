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
		this.availDates = {};
		this.iStockProducts = {};
		this.vIdOld = 0;
	}

	findAncestor (el, cls) {
		while (el.parentElement) {
			el = el.parentElement;
			if(el.querySelectorAll(cls).length > 0) {
				//console.log(cls+" length :: "+el.querySelectorAll(cls).length);
				return el.querySelector(cls);
			}
		}
		return false;
	}

	iStockValidateEmail(emailId) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(emailId);
	}

	iStockUrlParam(pname) {
		var results = new RegExp('[\?&]' + pname + '=([^&#]*)').exec(window.location.href);
		if(results!=null) {
			return results[1] || 0;
		}
		return results;
	}

	async requestToSever(page, body) {
		const url = this.iStockUrl+"/"+page;
		//console.log(new URLSearchParams(body));
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
	    let pId = product.id;
        //console.log('getAvailDates :'+pId);
		let data = "shopId="+this.shopInfo.iStockShopId+"&pid="+pId;
		let res = await this.requestToSever("check-availability.php", data);
		this.availDates[pId] = res;
		//console.log(this.availDates);
		if(vId!==null) { this.istockNotifyShow(product, vId, iStockWrapper); }
		//console.log('getAvailDates: ',this.availDates[pId]);
	}	
	
	istockgetProduct(handle, iStockWrapper, vId=null) {
		console.log("istockgetProduct :: " + handle);
		var getProduct = fetch(window.Shopify.routes.root + 'products/'+handle+'.js')
		.then(response => response.json())
		.then(product => {
            //console.log(product);
			this.iStockProducts[product.handle] = product;
			if(this.availableMsg=='') { this.getAvailDates(product, vId, iStockWrapper); }			
			else { if(vId!==null) { this.istockNotifyShow(product, vId, iStockWrapper); } }
		});
	}

	istockGetVariant(vId, iStockVariants) {
		var istockGetVariant = false;
		for (let key in iStockVariants) {
			if (iStockVariants[key]['id'] == vId) {
				istockGetVariant = iStockVariants[key];
				break;
			}
		}
		return istockGetVariant;
	}

	iStockResubscribe(iStockWrapper) {
	    var emailId = decodeURIComponent(this.iStockUrlParam('customer'));
	    if(emailId!=null && this.iStockValidateEmail(emailId)) {
    	    console.log('iStockResubscribe : '+emailId);
		    iStockWrapper.querySelector('.iStock-email-id').value = emailId;
		    this.istockNotifyMe(iStockWrapper.querySelector('.iStock-notify-btn'));
		    var sPageURL = window.location.href;
		    var sUpdateUrl = sPageURL.split('?');
		    window.history.replaceState(null, null, sUpdateUrl[0]);
	    }
    }
    
    async istockSetVistited(vId) {
	    var emailId = decodeURIComponent(this.iStockUrlParam('customer'));
        if(vId!=null && emailId!=null && this.iStockValidateEmail(emailId)) {
            console.log('istockSetVistited : '+emailId);
            let data = "shopId="+this.shopInfo.iStockShopId+"&cust="+emailId+"&vid="+vId;
			let res = await this.requestToSever("set_visited.php", data);
        }
    }

	istockNotifyShow(product, vId, iStockWrapper) {
		let pId = product.id;
		let istockShowNotify = false;
				
	    if(this.shopInfo.istExcludeProd.indexOf(pId)>=0) {
		    console.log('product excluded ::'+pId);
	    }
	    else if(this.shopInfo.istExcludeVar.indexOf(vId)>=0) {
		    console.log('variant excluded ::'+vId);
	    }
	    else {
	        let iStockVariant = this.istockGetVariant(vId, product.variants);
		    if(iStockVariant) {
		    if(this.allowPreorder=='true') {
			    var prodTag = product.tags;
			    var istockPreorderTag = "istock-preorder";
			    var istockPreorderVarTag = istockPreorderTag+'-'+iStockVariant.sku;
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
            console.log(this.availDates);
	        //console.log('availDates : '+ pId+' :: '+vId);
            if(this.availableMsg!='') { // set default msg
              showAvailabilityLbl = 'inline';
              showAvailability = 'block'; 
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
		    iStockWrapper.querySelector(".iStock-availability > span").innerHTML = '';
			iStockWrapper.style.display = 'none';
		}
	}

	async istockNotifyMe(istockBtnObj, encyEmail=null) {
      console.log(istockBtnObj);
      let iStockWrapper = this.findAncestor(istockBtnObj, ".iStock-wrapper");
      let msgElm = iStockWrapper.querySelector('.iStock-msg');
      msgElm.classList.remove('iStock-error');
      msgElm.style.display = "none";

      istockBtnObj.classList.add('disabled');      
      istockBtnObj.setAttribute('disabled', 'disabled');

      var emailId = iStockWrapper.querySelector('.iStock-email-id').value;      
      //if(emailId == undefined) { return; }
      if(encyEmail == null && !this.iStockValidateEmail(emailId)) {
        msgElm.innerHTML = window.istock.error_msg;
        msgElm.classList.add('iStock-error');
        msgElm.style.display = 'block';
      }
      else {
        console.log('emailId :: '+emailId);
      	let productHandle = iStockWrapper.getAttributeNode("data-handle").value;
      	let iStockProduct = this.iStockProducts[productHandle];
      	let varSelector = this.findAncestor(istockBtnObj, this.varSelector);
        let vId = varSelector.value;
        let iStockVariant = this.istockGetVariant(vId, iStockProduct.variants);

        let data = "shopId="+this.shopInfo.iStockShopId+"&cust="+emailId+"&vid="+iStockVariant.id+"&pid="+iStockProduct.id+"&vTitle="+iStockVariant.title+"&pTitle="+iStockProduct.title+"&shopLocale="+window.Shopify.locale;
        //console.log("shopId="+this.shopInfo.iStockShopId+"&cust="+emailId+"&vid="+iStockVariant.id+"&pid="+iStockProduct.id+"&vTitle="+iStockVariant.title+"&pTitle="+iStockProduct.title);
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

	async init() {
		//console.log("istock_init call...");
		if(document.querySelectorAll(this.varSelector).length) {
		if (Object.keys(this.shopInfo).length==0 || this.shopInfo.iStockShop != Shopify.shop) {
			//console.log("istock_init - set storage");
			let data = "shop="+Shopify.shop;
			let res = await this.requestToSever("istock_init.php", data);
          	if(res.length==0) { return false; }
          	this.shopInfo = res;
            sessionStorage.shopInfo = JSON.stringify(res);
            console.log('sessionStorage :', this.shopInfo);            
		}
		
	    if(this.isProductPage) {
	        let elm = document.querySelector(this.varSelector);
	        let iStockWrapper = this.findAncestor(elm, ".iStock-wrapper");
	        let productHandle = iStockWrapper.getAttributeNode("data-handle").value;
	        //console.log(productHandle);
	        if(productHandle !== 'undefined') {
		        let vId = elm.value;
		        this.istockgetProduct(productHandle, iStockWrapper, vId);
		        this.istockSetVistited(vId);
	        }
	    }
		}

		if (this.optSelector == '') {
			// on name=id change
			//console.log('iStockVarSelector change : '+this.varSelector);
			let selectorElm = document.querySelectorAll(this.varSelector);
			selectorElm.forEach(el => el.addEventListener('change', event => {
				let varSelector = event.target;
				let vId = varSelector.value;
				let iStockWrapper = this.findAncestor(varSelector, ".iStock-wrapper");
				let productHandle = iStockWrapper.getAttributeNode("data-handle").value;
				console.log(this.iStockProducts[productHandle]);
				this.istockNotifyShow(this.iStockProducts[productHandle], vId, iStockWrapper);
			}));
		}
		else {
			// on option selector change
			setTimeout(()=> {
				//console.log('optSelector change : '+this.optSelector);
				let selectorElm = document.querySelectorAll(this.optSelector);
				selectorElm.forEach(el => el.addEventListener('change', event => {
					let varSelector = this.findAncestor(el, this.varSelector);
					let vId = varSelector.value;
					let iStockWrapper = this.findAncestor(varSelector, ".iStock-wrapper");
					let productHandle = iStockWrapper.getAttributeNode("data-handle").value;
					console.log(this.iStockProducts[productHandle]);
					this.istockNotifyShow(this.iStockProducts[productHandle], vId, iStockWrapper);
				}));
			}, 400);
		}

		// istockNotify btn click
		if(document.querySelectorAll(".iStock-notify-btn").length > 0) {
			let notifyMe = document.querySelector(".iStock-notify-btn");
			notifyMe.addEventListener("click", event => {
				this.istockNotifyMe(notifyMe);
			})
		}
	}
}

var iStock = new NowInStock();
iStock.init();
