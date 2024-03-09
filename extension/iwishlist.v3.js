class Wishlist {
    constructor() {
      //this.iWishUrl = 'https://test.myshopapps.com/ajax2';
      this.iWishUrl = 'https://api.myshopapps.com/iwish/V1';
      this.varSelector = window.iwish.variant_selector!='' ? window.iwish.variant_selector : '[name=id]';
      this.optSelector = window.iwish.option_selector!='' ? window.iwish.option_selector : '';
      this.qtySelector = '[name=quantity]';
      this.custId = window.iwish.cust !== "" ? parseInt(window.iwish.cust) : 0;
      console.log('custId',this.custId)
      if(this.custId == 0 && localStorage.iWishsync == "true") { // if logout
        console.log('logout...');
        localStorage.removeItem('iWishlist');
        localStorage.removeItem('iWishsync');
      }
      console.log('iWishsync',Boolean(localStorage.iWishsync))
      this.iWishlist = localStorage.iWishlist ? new Map(JSON.parse(localStorage.iWishlist)) : new Map();
      this.iWishsync = localStorage.iWishsync && localStorage.iWishsync=== "true" ? true : false;
      this.customDelay = typeof window.iwish.custom_delay !== 'undefined' && window.iwish.custom_delay!='' ? window.iwish.custom_delay : 300;
    }
  
    findAncestor(el, cls) {
      while (el.parentElement) {
        el = el.parentElement;
        if(el.querySelectorAll(cls).length > 0) {
        //console.log(cls+" length :: "+el.querySelectorAll(cls).length);
        return el.querySelector(cls);
        break;
        }
      }
      return false;
    }
  
    getWishlist() {
      return JSON.stringify(Array.from(iWish.iWishlist));
    }
  
    setWishlist() {
      console.log(iWish.iWishlist);
      localStorage.iWishlist = JSON.stringify(Array.from(iWish.iWishlist));
      console.log(localStorage.iWishlist);
    }
  
    getCounter() {
      return iWish.iWishlist.size;
    }
  
    setCounter() {
      const selectorElm = document.querySelectorAll(".iwish-counter");
      if(selectorElm.length) {
        selectorElm.forEach( el => {
        el.innerHTML = this.getCounter();
        });
      }
    }
  
    isInWishlist(vId) {
      return iWish.iWishlist.has(vId) ? true : false;
    }
  
    setIwishAdded(iwishAdd) {
      iwishAdd.classList.add("iwishAdded");
      iwishAdd.innerHTML = iwishAdd.classList.contains('iWishAddColl') ? window.iwish.iwish_added_txt_col : window.iwish.iwish_added_txt;
    }
  
    setIwishRemoved(iwishAdd) {
      iwishAdd.classList.remove("iwishAdded");
      iwishAdd.innerHTML = iwishAdd.classList.contains('iWishAddColl') ? window.iwish.iwish_add_txt_col : window.iwish.iwish_add_txt;
    }
  
    checkIwish(varSelector) {
      let vId = varSelector.value;
      let iwishAdd = this.findAncestor(varSelector, ".iWishAdd");
      console.log('checkIwish :', vId);
      iwishAdd.setAttribute("data-variant", vId);
      if(this.isInWishlist(vId)) { // add to wishlist
        this.setIwishAdded(iwishAdd);
      }
      else { // remove if added 
        this.setIwishRemoved(iwishAdd);
      }
    }
  
    // wishlist product listing - check if products added
    checkIwishColl() {
      let iwishAdd = document.querySelectorAll(".iwishcheck");
      if(iwishAdd.length) {
        for (var i = 0; i < iwishAdd.length; i++) {
          if(iwishAdd[i].innerHTML=='') {
            iwishAdd[i].innerHTML = window.iwish.iwish_add_txt_col;
            // attach click 1st time
            console.log('iwishAddClick..');
            this.iwishAddClick(iwishAdd[i]);
          }
          let vId = iwishAdd[i].getAttributeNode("data-variant").value;
          //console.log('checkIwish :', vId);        
          if(this.isInWishlist(vId)) {
            this.setIwishAdded(iwishAdd[i]);
          }
          else { // remove if added 
            this.setIwishRemoved(iwishAdd[i]);
          }
          iwishAdd[i].classList.remove("iwishcheck");
        }
      }
    }
  
    customFiltersClick(el) {
      let checkiwishElm = document.querySelectorAll(el);
      if(checkiwishElm.length > 0) {
        checkiwishElm.forEach(e => e.addEventListener('click', event => {
          let e = event.target;
          if(e.tagName == 'INPUT' || e.tagName == 'SELECT' || e.tagName == 'OPTION') {
            e.removeEventListener("change", ev => { console.log('removeEventListener') });
            e.addEventListener('change', ev => {
              setTimeout(() => {
                let iwishcheck = document.querySelectorAll(".iwishcheck");              
                console.log('checkIwishColl on custom filter change : iwishcheck.length ::' + iwishcheck.length);
                
                // attach iwish.qv_button click
                if(iwishcheck.length && typeof iWishQV !== 'undefined' && typeof iWishQV.init === 'function') {
                  console.log('iWishQV.init...');
                  iWishQV.init();
                }
                
                this.checkIwishColl();
              }, this.customDelay);
            });
          }
          else {
            setTimeout(() => {            
              let iwishcheck = document.querySelectorAll(".iwishcheck");              
              console.log('checkIwishColl on custom filter click  : iwishcheck.length ::' + iwishcheck.length);
              
              // attach iwish.qv_button click
              if(iwishcheck.length && typeof iWishQV !== 'undefined' && typeof iWishQV.init === 'function') {
                console.log('iWishQV.init...');
                iWishQV.init();
              }
              
              this.checkIwishColl();
            }, this.customDelay);
          }
        }, false));
      }
      
      if (typeof customFiltersClickFn !== 'undefined' && typeof customFiltersClickFn === 'function') { customFiltersClickFn(); }
    }
     
    iwishAddClick(el) {
      el.addEventListener('click', event => {
        event.preventDefault();
       
        let qtySelect = this.findAncestor(el, this.qtySelector);
        let qty = qtySelect ? qtySelect.value : 1;
        let pId = el.getAttributeNode("data-product").value;
        let vId = el.getAttributeNode("data-variant").value;
        
        if(this.isInWishlist(vId)) { // remove if added
          this.iwishRemove(vId, pId);
          this.setIwishRemoved(el);
                  
          // remove deleted wishlist element from wishlist page
          if(el.closest('.iwishItem')!=null) {
            el.closest('.iwishItem').remove();
          }
        }
        else { // add to wishlist
          this.iwishAdd(vId,pId,qty);
          this.setIwishAdded(el);
        }
      });
    }
    
    iwishAdd(vId, pId, qty, catId=0) {
        console.log('iwishAdd :', vId);
        iWish.iWishlist.set(vId, qty);
        this.setWishlist(); // update storage
        this.setCounter();
        
        if(this.custId>0) {
          let data = "customer_id="+this.custId+"&product_id="+pId+"&variant_id="+vId+"&product_qty="+qty+"&category_id="+catId;
          this.requestToSever("addToWishlist", data);
  
          //callback
          if (typeof iWishAddFn !== 'undefined' && typeof iWishAddFn === 'function'){ iWishAddFn(vId); }
      }
    }
  
    iwishRemove(vId, pId, catId=0) {
      console.log('iwishRemove ::', vId);
      iWish.iWishlist.delete(vId);
      this.setWishlist(); // update storage    
      this.setCounter();
      
      if(this.custId>0) {
        let data = "customer_id="+this.custId+"&product_id="+pId+"&variant_id="+vId+"&category_id="+catId;
        return this.requestToSever("removeWishlist", data);
      }
      
      //callback
      if (typeof iWishRemoveFn !== 'undefined' && typeof iWishRemoveFn === 'function'){ iWishRemoveFn(vId); }
    }
    
    async requestToSever(page, body, method='POST', cFunction=null)  {
      const url = this.iWishUrl+"/"+page;
      const options = {
          method: method,
          headers: {'Content-Type': 'application/x-www-form-urlencoded', domain: window.iwish.shop, Authorization:''},
          body: new URLSearchParams(body)
      };
      try {
          const response = await fetch(url, options);
          const data =  await response.json();
          
          if(cFunction!=null) { cFunction(data); }
          return data;
      } catch (error) {
          console.error(error);
          return error;
      }
    }
  
    // sync iwish when login
    syncWishlist() {
      let data = "customer_id="+this.custId+"&wishlist="+this.getWishlist();
      console.log('syncWishlist', data)
      this.requestToSever("syncWishlist", data, 'POST', this.syncWishlistFn);
    }
  
    //callbackFn
    syncWishlistFn(response) {
      console.log('syncWishlistFn...', response.result, response.errors);
      if(response.result!='') {
          iWish.iWishlist = new Map(Object.entries(response.result));
          iWish.setWishlist(); // update storage
          iWish.setCounter();
      }
      iWish.iWishsync = true;
      console.log(iWish.iWishsync);
      localStorage.setItem('iWishsync', iWish.iWishsync);
    }
  
    iWishPost(e,t) {
      let method="post"; let n=document.createElement("form"); n.setAttribute("method",method); n.setAttribute("action",e); for(let r in t){ if(t.hasOwnProperty(r)){ let i=document.createElement("input"); i.setAttribute("type","hidden"); i.setAttribute("name",r); i.setAttribute("value",t[r]); n.appendChild(i)} } document.head.appendChild(n); n.submit();
    }
  
    init() {
      this.setCounter();
      // sync wishlist
      console.log('inside init',this.iWishsync)
      if(this.custId > 0 && !this.iWishsync) {
        console.log("this.custId ::"+this.custId);
        console.log("syncWishlist ..");
        this.syncWishlist();
      }
  
      if(document.querySelectorAll(".iWishAdd").length && typeof window.iwish.iwish_add_txt !== 'undefined') {
        // iWishAdd click
        let iWishAddElm = document.querySelectorAll('.iWishAdd');
        iWishAddElm.forEach( elm => {
          if(elm.innerHTML=='') { elm.innerHTML = window.iwish.iwish_add_txt; }
          this.iwishAddClick(elm);
        });
  
        // checkiwish on product page
        let selectorElm = document.querySelectorAll(this.varSelector);
        selectorElm.forEach( el => {
          this.checkIwish(el);
        });
        
        // on variant change
        setTimeout(() => {
        if(this.optSelector == '') {
          selectorElm.forEach(el => el.addEventListener('change', event => {
            this.checkIwish(el);
          }));
        }
        else {
          let selectorElm2 = document.querySelectorAll(this.optSelector);
          selectorElm2.forEach(el => el.addEventListener('change', event => {
            setTimeout(() => {
              let el2 = this.findAncestor(el, this.varSelector);
              this.checkIwish(el2)
            }, 300);
          }));
        }
        }, this.customDelay);
      }
      
      // iwishRemove click
      let iWishRemoveElm = document.querySelectorAll('.iwishRemove');
      if(iWishRemoveElm.length) {
        iWishRemoveElm.forEach(el => el.addEventListener('click', event => {
          event.preventDefault();
          this.iwishRemove(el);
        }));
      }
      
      if(typeof window.iwish.iwish_add_txt_col !== 'undefined') {
      // checkiwish on product grid    
      this.checkIwishColl();
  
      // dynamically added elements : on page load
      setTimeout(() => {
          this.checkIwishColl();
      }, this.customDelay);
      
      // dynamically added elements : on Custom filters
      if(typeof window.iwish.custom_filters !== 'undefined' && window.iwish.custom_filters!='') {
        let custCheck = window.iwish.custom_filters;
        let custCheckLst = custCheck.split(", ");
        custCheckLst.forEach( el => {
            this.customFiltersClick(el);
        });
      }
      
      // Custom checkiwish on element click
      /*if(typeof window.iwish.custom_checkiwish !== 'undefined' && window.iwish.custom_checkiwish!='') {
        let custCheck = window.iwish.custom_checkiwish;
        let custCheckLst = custCheck.split(", ");
        custCheckLst.forEach( el => {
            this.customFiltersClick(el);
        });
      }*/
      }
          
      // iwish page link
      let iwishPageLink = document.querySelectorAll('.iwishPage');
      if(iwishPageLink.length) {
        iwishPageLink.forEach(e => e.addEventListener('click', event => {
          event.preventDefault();
          let data = this.custId > 0 ? { cId:this.custId } : { iwishlist:this.getWishlist() };
          this.iWishPost(e.getAttributeNode('href').value, data);
        }));
      }
      
      if (typeof iWishinitFn !== 'undefined' && typeof iWishinitFn === 'function') { iWishinitFn(); }
    }
  }
  
  var iWish = new Wishlist();
  iWish.init();
  