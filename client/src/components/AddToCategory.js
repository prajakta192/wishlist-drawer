import React, { useState } from "react";
import { Button, Col, Dropdown, Row, Toast, ToastContainer } from "react-bootstrap";
// import {BiPlus} from 'react-icons/bi'
import{BiPlusCircle, BiXCircle} from 'react-icons/bi'

  const AddToCategory = ({ isLoggedIn,closeCart,products,setCategories,categories }) => {
 
  const [showCategory, setShowCategory] = useState(false);
   
  //category state
  const initialDropVal = 'Main Wishlist';
  const[isEdit, setIsEdit] = useState({id: 0, status:false, index:0});
  const [newCategory, setNewCategory] = useState('');
  const[successMsg, setSuccessMsg] = useState('');
  const[curDropItem, setCurDropItem] = useState(initialDropVal);

  const addToCategory = () => {
    setShowCategory((prevCategory) => !prevCategory);
  };

// add new category
  const saveToCategory = () => {
    let newId;
  if(newCategory){
        newId = categories.length + 1;
        let newCatEntry = {category_id : newId, category_name:newCategory, status:false}
        setCategories([...categories, newCatEntry])
        setNewCategory('');
        setSuccessMsg('Category saved successfully');
        setTimeout(() => {
         setSuccessMsg('');
        }, 2000);
        setShowCategory(false);
        window.addCategory(newCategory)
    }
    localStorage.setItem('category_id',newId);
    localStorage.setItem('category_name', newCategory);
    localStorage.setItem('categories', JSON.stringify(categories))
  };

  //change category name
  const catNameChange = (id, updatedTitle) => {
    debugger;
    console.log(updatedTitle, id);
   
    setCategories(
      categories.map((item) => {
        if(item.category_id === id){
          item.category_name = updatedTitle
          localStorage.setItem('category_name', updatedTitle);
           window.updateCategory(id,updatedTitle)
        }
        return item

      })
    )
    }

const getCurState = (index) => {
  //debugger;
  if(isEdit.status){
    if(isEdit.index === index){
      return true;
    }
    else{
      return false
    }
  }
}

//edit category
const editCat = (index,name) => {
  debugger;
  setIsEdit(
   {status: !isEdit.status,index:index}
)
  console.log('edit',isEdit.index, 'index',index,'status',isEdit.status);
  localStorage.setItem('category_name', name)
}

// delete category
const deleteCategory = (id) => {
  window.removeCategory(id)
}

//handling drop down item
const dropDownHandler = (curdropItem) => {
  debugger;
  console.log(curdropItem);
  setCurDropItem(curdropItem)
  
}
const initialDropValue = () =>{
 setCurDropItem(initialDropVal)
}
//const categoryName = localStorage.getItem('category_name');

  return (
    
    <>
      <Row className={isLoggedIn ? "title_container mb-2" : "title_container"}>
        <Col sm={1} style={{ marginTop: ".20rem" }}>
          <div>
            <i
              className="fa-solid fa-angle-right fa-sm"
              style={{ cursor: "pointer" }}
              onClick={closeCart}
            ></i>
          </div>
        </Col>
        <Col sm={11}>
          <div>
            <strong style={{ fontSize: "14px" }}>
              My Wishlist (
              {products.length})
            </strong>
          </div>
        </Col>
        
      </Row>
      
      {successMsg !== '' && (
        <ToastContainer position="top-start">
        <Toast className="d-inline-block m-1"
          bg='success' style={{opacity:'.9'}}>
        <Toast.Body className={'success' && 'text-white'} style={{fontSize:'14px',padding:'.30rem'}}>{successMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
      )}

      {isLoggedIn && (
        <Row className="align-items-center">
          <Col sm={11} className={!showCategory ? 'opacity-1' : 'opacity-0'}>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                { curDropItem }
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <ul className={categories.length === 0 ? 'display-n':'display-b'}> 
                {categories && categories.map((category,index) => (

                  <li key={index} id={index} className={`${!getCurState(index)}`}>
                  {category.category_name === 'Main Wishlist' &&   
                   <Col sm={10}>
                      <span style={{cursor:'pointer'}} onClick={initialDropValue}>Main Wishlist</span>
                  </Col>
                }
                  {category.category_name !== 'Main Wishlist' && 
                  <>
                    <Row>
                      <Col sm={10}>
                        {/* <span>{category.id} </span> */}
                       {!getCurState(index) ? (<span onClick={() => dropDownHandler(category.category_name)} style={{cursor:'pointer'}} >{category.category_name}</span>):
                       (<input type='text' className='editCat' value={category.category_name} onChange={(e) => catNameChange(category.category_id, e.target.value)}/>)
                       }
                      </Col>
                      <Col sm={1} className='p-0'>
                        {!getCurState(index)?
                        <img alt="trash" className="trash-btn" onClick={()=>editCat(index,category.category_name)}  src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/editCat.svg" /> : <img alt="trash" className="trash-btn" onClick={()=>editCat(index,category.category_name)}  src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/saveCat.svg" />}
                        
                        {/*<img alt="trash" class="trash-btn" src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/saveCat.svg"/>*/}
                      </Col>
                      <Col sm={1} className='p-0' onClick={() => deleteCategory(category.category_id)}>
                        <img
                          alt="delete"
                          className="trash-btn"
                          src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/trash_icon.svg"
                        />
                      </Col>
                    </Row>
                    </>
                  }
                  </li>
                ))}
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col sm={1} className="text-center p-0"  onClick={addToCategory}>
          {showCategory ? <BiXCircle title='close category'/> : <BiPlusCircle title='Add to category'/>}
          {/*<BiPlus title='Add to category' />*/}
          
         
          </Col>
        </Row>
      )}
      {showCategory && (
       
        <Row className="overlay">
          <Col sm={9} className="p-0">
            <input
              type="text"
              placeholder="Category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Col>
          <Col sm={2}>
            <Button
              variant="outline-success"
              className="btn-lg"
              disabled={!newCategory}
              onClick={saveToCategory}
            >
              Save
            </Button>
          </Col>
        </Row>
       
      )}
    </>
  );
};

export default AddToCategory;
