import React, {useState} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import SocialMediaIcons from './SocialMediaIcons';
import '../styles/wishlistpagination.css'

const ProductPagination  = ({ data, RenderComponent, isLoggedIn, pageLimit, dataLimit }) => {

//Functionality

  //states
  const[pages] = useState(Math.round(data.length/ dataLimit))
  const[currentPage, setCurrentPage] = useState(1)
  
  //next/ previous  page
  function gotoNextPage() {
    setCurrentPage((page) => page + 1)
  }
  function gotoPreviousPage(){
    setCurrentPage((page) => page - 1)
  }

  //change currentpage on click
  function changePage(event){
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber)
  }

  //pagination data
  function getPaginationData(){
    const startindex = currentPage * dataLimit - dataLimit;
    const endIndex = startindex + dataLimit;
    return data.slice(startindex, endIndex)
  }
const paginationData = getPaginationData();
//console.log(paginationData);

//get group of page numbers in the pagination. 
  function getPaginationGroup() {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  }
const paginationGroup = getPaginationGroup()
//console.log(paginationGroup)
  return(
  <>
      <div className = 'dataContainer'>
      {
        paginationData.map((product, id) => (
            <RenderComponent key = {id} product = {product} id={id} isLoggedIn={isLoggedIn} paginationData={paginationData}/>
          ))
      }
      <div className='stickToBottom'>
      <Row>
          <Col sm={12}>
              <Button variant='outline-secondary btn-md text-uppercase w-100' className='addToCart'>Add All to cart</Button>
          </Col>
        </Row>
        <Row className='align-items-center'>
          <Col sm={6}>
              <SocialMediaIcons/>
          </Col>
          <Col sm={6}>
          <div className='pagination'>
              <button onClick = {gotoPreviousPage} className ={`prev ${currentPage === 1 ? 'disabled' : ''}`}>
             <div className="arrow left" />
              </button>

              {/* show page numbers*/}

               {paginationGroup.map((item, id) => (
                  <button key={id} onClick={changePage} className={`paginationItem ${currentPage === item ? 'active' : null}`}>
                  <span>{item}</span>
                  </button>
               ))}

              <button onClick = {gotoNextPage} className = {`next  ${currentPage === pages ? 'disabled' : ''}`}>
                <div className="arrow right" />
              </button>
          </div>
          </Col>
       </Row>
      </div>
    </div>
</>
)
}

export default ProductPagination