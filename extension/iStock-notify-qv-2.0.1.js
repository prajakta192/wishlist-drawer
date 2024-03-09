class NowInStockQV extends NowInStock {
	constructor() {
		super();
		this.qvButton = window.istock.qv_button;
		this.qvWrapper = window.istock.qv_wrapper;
	}
	
	initQuickview() {
	  //this.getShopInfo();
	  
	  //console.log('initQuickview :: iStock-wrapper length: '+document.querySelectorAll(this.qvWrapper).length);
	  if(document.querySelectorAll(this.qvWrapper).length) {
		this.setBlockValues();
	  
		let qvWrapper = document.querySelector(this.qvWrapper);
		if(this.logs) { console.log('iStock-wrapper length: '+qvWrapper.querySelectorAll('.iStock-wrapper').length); }
		if(qvWrapper.querySelectorAll('.iStock-wrapper').length == 0) {
			return;
		}
		let varSelector = qvWrapper.querySelector(this.varSelector);
		let iStockWrapper = this.findAncestor(varSelector, ".iStock-wrapper");
		// get products data
		let productHandle = iStockWrapper.getAttributeNode("data-handle").value;
		if(productHandle !== 'undefined' && typeof this.iStockProducts[productHandle] == 'undefined' ) {
			let vId = varSelector.value;
			this.istockgetProduct(productHandle, iStockWrapper, vId);
		}
		
		if (this.optSelector != '') {
			// on option selector change			
            let selectorElmAll = this.optSelector.split(", ");
			let selectorElm = qvWrapper.querySelectorAll(selectorElmAll);
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
		
		// istockNotify btn click
		let iStockBtn = qvWrapper.querySelector(".iStock-notify-btn");
		iStockBtn.addEventListener('click', event => {
			if(this.logs) { console.log('istockNotifyMe'); }
			this.istockNotifyMe(iStockBtn);
		});
	  }
	}
	
	init() {
	  var qvBtnElm = document.querySelectorAll(window.istock.qv_button);
	  if(this.logs) { console.log('iStockQV.init : '+qvBtnElm.length); }
	  qvBtnElm.forEach(el => el.addEventListener('click', event => {
		if(this.logs) { console.log('istock.qv_button clicked'); }
		setTimeout(()=> {
			this.initQuickview();
		}, 500);
	  }));
	}
}

var iStockQV = new NowInStockQV();
if(window.istock.qv_button!='') {
	iStockQV.init();
}
