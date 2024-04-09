import React, { useEffect, useState } from 'react'
import ProductList from '../Components/ProductList';
// import Skeleton from '../Components/skeleton'

function Store() {
  // const [loading, setLoading] = useState(true);
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   // ! Simulate fetching products from backend
  //   setTimeout(() => {
  //     // TODO Replace this with actual API call to fetch products
  //     const fetchedProducts = [
  //       { id: 1, name: 'Product 1' },
  //       { id: 2, name: 'Product 2' },
  //       { id: 3, name: 'Product 3' },
  //       // Add more products here
  //     ];
  //     setProducts(fetchedProducts);
  //     setLoading(false);
  //   }, 2000); // Simulate 2 seconds loading time
  // }, []); // Run only once on component mount

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        <ProductList/>
      </div>
    </div>
  );
}

export default Store
