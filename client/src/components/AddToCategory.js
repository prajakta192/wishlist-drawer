import React, { useState } from "react";
import { Button, Col, Dropdown, Row, Toast, ToastContainer } from "react-bootstrap";

  const AddToCategory = ({ isLoggedIn, initialvalue, wishlist, closeCart }) => {
 
  const [showCategory, setShowCategory] = useState(false);
   
  //const [saveCategory, setSaveCategory] = useState("");

  const addToCategory = () => {
    setShowCategory((prevCategory) => !prevCategory);
    //console.log(showCategory);
  };
  //category state
  const [categories, setCategories] = useState([]);
  const[isEdit, setIsEdit] = useState({id: 0, status:false, index:-1});
  const [newCategory, setNewCategory] = useState('');
  const[successMsg, setSuccessMsg] = useState('');
  const[catnameChange, setCatNameChange] = useState('');
  const[curDropItem, setCurDropItem] = useState('');
// add new category
  const saveToCategory = () => {
    let newId;
  if(newCategory){
        newId = categories.length + 1;
        let newCatEntry = {id : newId, title:newCategory, status:false}
        setCategories([...categories, newCatEntry])
        setNewCategory('');
        setSuccessMsg('Category saved successfully');
        setTimeout(() => {
         setSuccessMsg('');
        }, 2000);
        setShowCategory(false)
    }
    localStorage.setItem('category_id',newId);
    localStorage.setItem('category_name', newCategory)
  };
  let catName;
  const catNameChange = (e) => {
    setCatNameChange(e.target.value);
    }
const getCurState = (index) => {
  if(!isEdit.status){
    if(isEdit.index === index){
      return true;
    }
    else{
      return false
    }
  }
}
const editCat = (index,name) => {
  setIsEdit(
   {status: !isEdit.status,index:index}
)
  console.log('edit',isEdit.index, 'index',index,'status',isEdit.status);
  localStorage.setItem('category_name', name)
}
// delete category
const deleteCategory = (id) => {
  let newCategory = categories.filter(category => category.id !== id);
  setCategories(newCategory);
}

//handling drop down item
const dropDownHandler = (itemId) => {
  console.log(itemId);
  let curItem = categories.filter(category => category.id === itemId);
  setCurDropItem(curItem[0].title)
}

const saveCat = (cat_id, index) => {
 catName = catnameChange;
  console.log(catName)
  let isNameExist = categories.filter((item) => {
    console.log(item.title);
    return item.name == catName;
   
  })
  
  setIsEdit(
    {status: !isEdit.status, index: index }
    );
  
  console.log('edit',isEdit.index,'index',index);
}




//console.log(catNameChange)
const category_name = localStorage.getItem('category_name');
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
        <Col sm={10}>
          <div>
            <strong style={{ fontSize: "14px" }}>
              My Wishlist (
              {initialvalue ? initialvalue.length : wishlist.length})
            </strong>
          </div>
        </Col>
        {isLoggedIn && (
          <Col sm={1}>
            <span>
              <i
                className="fa-regular fa-plus fa-sm"
                title="Add New List"
                onClick={addToCategory}
              ></i>
            </span>
          </Col>
        )}
      </Row>
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
              variant="outline-secondary"
              className="btn-sm"
              disabled={!newCategory}
              onClick={saveToCategory}
            >
              Save
            </Button>
          </Col>
        </Row>
       
      )}
      {successMsg !== '' && (
        <ToastContainer position="top-start">
        <Toast className="d-inline-block m-1"
          bg='success'>
        <Toast.Body className={'success' && 'text-white'} style={{fontSize:'12px',padding:'.28rem'}}>{successMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
      )}

      {isLoggedIn && (
        <Row className="mb-1">
          <Col sm={12} className="p-0 mt-3">
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                Main wishlist
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <ul>
                  <li>
                    <Row>
                      <Col sm={10}>
                        <span>Main Wishlist</span>
                      </Col>
                    </Row>
                  </li>
                </ul>
                <ul className={categories.length === 0 ? 'display-n':'display-b'}>
                {categories && categories.map((category,index) => (

                  <li key={category.id} id={index} className={`${!getCurState(index)}`}>
                    <Row>
                      <Col sm={10}>
                        {/* <span>{category.id} </span> */}
                       {!getCurState(index) ? (<span onClick={() => dropDownHandler(category.id)}>{category.title}</span>):
                       (<input type='text' className='editCat' value={catnameChange}  onChange={catNameChange}/>)
                       }
                      </Col>
                      <Col sm={1}>
                        {!getCurState(index)?
                        <img alt="trash" className="trash-btn" onClick={()=>editCat(index,category.title)}  src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/editCat.svg" /> : <img alt="trash" className="trash-btn" onClick={()=>saveCat(category.id, index )}  src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/saveCat.svg" />}
                        
                        {/*<img alt="trash" class="trash-btn" src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/saveCat.svg"/>*/}
                      </Col>
                      <Col sm={1} onClick={() => deleteCategory(category.id)}>
                        <img
                          alt="delete"
                          className="trash-btn"
                          src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/trash_icon.svg"
                        />
                      </Col>
                    </Row>
                  </li>
                ))}
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AddToCategory;
