import React, { useEffect, useState } from 'react'
import Skeleton from '../Components/skeleton'


function Store() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ! Simulate fetching products from backend
    setTimeout(() => {
      // TODO Replace this with actual API call to fetch products
      const fetchedProducts = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' },
        // Add more products here
      ];
      setProducts(fetchedProducts);
      setLoading(false);
    }, 20000); // Simulate 2 seconds loading time
  }, []); // Run only once on component mount

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {loading ? (
          // Render skeleton UI while loading
          <>
          {Array.from({ length: 21 }).map((_, index) => ( // Render 9 skeleton items
              <div key={`skeleton ${index}`} >
                <Skeleton />
              </div>
            ))}
          </>
        ) : (
          // Render products when loaded
          // TODO  need to change this to the actual Design  
          products.map(product => (
            <div key={product.id} className="bg-gray-200 p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              {/* Add more product details here */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Store
