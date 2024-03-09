class Quickview extends Wishlist {
    constructor() {
      super();
      this.qvButton = window.iwish.qv_button;
      this.qvWrapper = window.iwish.qv_wrapper;
      this.quickviewCnt = 0;
    }
  
    initQuickview(currentQVbtn) {
      let iwishAdd = this.findAncestor(currentQVbtn, ".iWishAddColl");
      if(iwishAdd) { iwishAdd.classList.add("iwishcheck"); }
      
      // iWishAdd click
      console.log(this.qvWrapper + ' length :: ' + document.querySelectorAll(this.qvWrapper).length);
      if(document.querySelectorAll(this.qvWrapper).length) {
        let qvWrapper = document.querySelector(this.qvWrapper);
        
        let iWishAddElm = qvWrapper.querySelectorAll('.iWishAdd');
        if(!iWishAddElm) { console.log('iWishAddElm not found...'); return false; }
        
        iWishAddElm.forEach( elm => {
          /*if(elm.innerHTML=='') {
            elm.innerHTML = window.iwish.iwish_add_txt;
          }*/
          this.iwishAddClick(elm);
        });
  
        // checkiwish on product
        let selectorElm = qvWrapper.querySelectorAll(this.varSelector);
        selectorElm.forEach( el => {
          this.checkIwish(el);
        });
      
        // variant change
        if(this.optSelector == '') {
          selectorElm.forEach(el => el.addEventListener('change', event => {
            this.checkIwish(el);
          }));
        }
        else {
          let selectorElm2 = qvWrapper.querySelectorAll(this.optSelector);
          selectorElm2.forEach(el => el.addEventListener('change', event => {
            setTimeout(() => {
              let el2 = this.findAncestor(el, this.varSelector);
              this.checkIwish(el2);
            }, 300);
          }));
        }
        
        // check iwish after qv close
        if(window.iwish.qv_close_button!='') {
          let qvClose = document.querySelector(window.iwish.qv_close_button);
          console.log('qv_close_button length: '+document.querySelectorAll(window.iwish.qv_close_button).length);
          qvClose.addEventListener('click', event => {
            console.log(window.iwish.qv_close_button+' clicked');
            console.log(iWish.iWishlist);
            this.checkIwishColl();
          });
        }
  
        if (typeof iWishinitQvFn !== 'undefined' && typeof iWishinitQvFn === 'function') { iWishinitQvFn(); }
      }
      else {
          if(this.quickviewCnt > 6) { return false; }
          setTimeout(()=> {
              this.quickviewCnt += 1;
              this.initQuickview(currentQVbtn);
          }, 500);
      }
    }
    
    init() {
        var qvBtnElm = document.querySelectorAll(window.iwish.qv_button);
        qvBtnElm.forEach(el => el.addEventListener('click', event => {
          setTimeout(()=> {
              console.log('iwish.qv_button clicked');
              this.initQuickview(el);
          }, 500);
        }));
    }
  }
  
  var iWishQV = new Quickview();
  if(window.iwish.qv_button!='') {
    iWishQV.init();
  }
  