import React, { useState } from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap";

const AddToCategory = ({ isLoggedIn, initialvalue, wishlist, closeCart }) => {
 
    const [showCategory, setShowCategory] = useState(false);
   
  const [saveCategory, setSaveCategory] = useState("");

  const addToCategory = () => {
    setShowCategory((prevCategory) => !prevCategory);
    //console.log(showCategory);
  };
  //category state
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(" ");

console.log(newCategory);
  const saveToCategory = () => {
    console.log("save category");
    if(newCategory === ''){
        alert('please enter valid category');
    } else if(newCategory){
        let newId = categories.length + 1;
        let newCatEntry = {id : newId, title:newCategory, status:false}
        setCategories([...categories, newCatEntry])
        setNewCategory('');
    }
    console.log(categories)
  };

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
              onClick={saveToCategory}
            >
              Save
            </Button>
          </Col>
        </Row>
      )}
      {isLoggedIn && (
        <Row className="mb-1">
          <Col sm={12} className="p-0">
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
                <ul>
                {categories && categories.map((category,index) => (

                  <li key={index}>
                    <Row>
                      <Col sm={10}>
                        <span>{category.id} </span>
                        <span>{category.title}</span>
                      </Col>
                      <Col sm={1}>
                        <img
                          alt="trash"
                          className="trash-btn"
                          src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/editCat.svg"
                        />
                        {/*<img alt="trash" class="trash-btn" src="https://s3.amazonaws.com/cdn.myshopapps.com/iwish/drawer/saveCat.svg"/>*/}
                      </Col>
                      <Col sm={1}>
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
