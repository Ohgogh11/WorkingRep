import React, { useState } from "react";
import ProductList from "../Components/ProductList";
import { Link } from "react-router-dom";
import AdminComponent from "../Components/AdminComponent";
import { ShopContext } from "../contexts/ShopContext";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import DeleteModal from "../Components/DeleteModal";

function Store() {
  const isAuthenticated = useIsAuthenticated();
  const userAuth = useAuthUser();
  const authHeader = useAuthHeader();
  const [deletePressed, setDeletePressed] = useState(false);
  return (
    <ShopContext.Provider
      value={{
        userAuth,
        isAuthenticated,
        authHeader,
        deletePressed,
        setDeletePressed,
      }}>
      <div className="container mx-auto">
        <h1 className=" text-6xl underline font-bold mb-4 text-center mt-20">
          המוצרים שלנו
        </h1>
        <div className=" flex justify-around py-5">
          <AdminComponent>
            <Link
              to={"/admin/Create-New-Product"}
              className="w-40 bg-green-500 border rounded-xl text-center">
              הוסף מוצר
            </Link>
            <button
              className="w-40 bg-red-500 border rounded-xl text-center"
              onClick={() => setDeletePressed((prev) => !prev)}>
              מחק מוצר
            </button>
          </AdminComponent>
        </div>
        <ProductList />
      </div>
    </ShopContext.Provider>
  );
}

export default Store;
