import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Define a function to fetch product details
        const fetchProduct = async () => {
            try {
                // Make a request to fetch product details using the productId
                const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        // Call the fetchProduct function when the component mounts
        fetchProduct();
        // Clean up the effect
        return () => {
            // Optionally cancel any ongoing requests or perform cleanup
        };
    }, [productId]); // Re-run effect when productId changes

    return (
        <div>
            {product ? (
                <div>
                    <img src={product.image} alt="" />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    {/* Other product details */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProductDetailPage
