import React from "react";
import ProductList from "../Components/ProductList";
import { Link } from "react-router-dom";

function Store() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className=" flex justify-center py-5">
        <Link
          to={"/admin/Create-New-Product"}
          className="w-40 bg-green-500 border rounded-xl text-center">
          Add New Product
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <ProductList />
      </div>
    </div>
  );
}

export default Store;
