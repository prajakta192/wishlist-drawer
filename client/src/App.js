import React, { useEffect, useState } from 'react';
import WishlistDrawerPage from './pages/WishlistDrawerPage';
import { Container } from 'react-bootstrap';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  //fetch wishlist data
  async function fetchWishlistData() {
    const res = await window.fetchWishlist(10, 1);
    const data = await res.result;
    setProducts(data);
  }

  //fetch category data
  async function fetchCategoryData() {
    const res = await window.fetchCategory();
    const catData = res.result;

    const arr = [];
    catData.reduce((acc, curr) => {
      if (acc.indexOf(curr.category_name) === -1) {
        acc.push(curr.category_name);
        arr.push(curr);
      }
      return acc;
    }, []);
    setCategories(arr);
  }

  useEffect(() => {
    fetchWishlistData();
    fetchCategoryData();
  }, []);

  //State for cart drawer
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => {
    setIsOpen(true);
    //fetchWishlistData();
    //fetchCategoryData();
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };

  let i = window.iwish.open_drawer_on;

  let s = document.querySelectorAll(i);
  s.forEach((el) =>
    el.addEventListener('click', (event) => {
      openDrawer();
      console.log(event.target.className);
    })
  );

  return (
    <Container fluid className='p-0 overflow-hidden'>
      <WishlistDrawerPage
        categories={categories}
        setCategories={setCategories}
        isOpen={isOpen}
        closeDrawer={closeDrawer}
        products={products}
      />
    </Container>
  );
}

export default App;
