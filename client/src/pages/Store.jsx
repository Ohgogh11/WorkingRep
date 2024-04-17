import React from "react";
import ProductList from "../Components/ProductList";

function Store() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        <ProductList />
      </div>
    </div>
  );
}

export default Store;
