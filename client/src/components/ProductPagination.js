import React from 'react';
import { Col, Pagination, Row } from 'react-bootstrap';

const ProductPagination = ({wishlist,initialvalue}) => {
    let active = 2;
    let items = [];

    for (let number = 1; number <= initialvalue.length; number++) {
        items.push(
          <Pagination.Item key={number} active={number === active}>
            {number}
          </Pagination.Item>,
        );
      }

    return(
      <Row className='mt-4'>
        <Col sm={12}>
        <Pagination className='justify-content-center'>
            {items}
        </Pagination>
        </Col>
      </Row>
    )
}

export default ProductPagination