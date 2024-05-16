import React, { useContext, useState } from "react";
import Skeleton from "./Skeleton";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ShopContext } from "../contexts/ShopContext";
import { IoClose } from "react-icons/io5";
import DeleteModal from "./DeleteModal";

const fetchProducts = async () => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return !data ? data : [];
  } catch (error) {
    throw new Error(error);
  }
};

const fetchWishList = async (userId) => {
  try {
    if (!userId) {
      return [];
    }
    const { data } = await axios.get(
      `https://fakestoreapi.com/carts/${userId}`
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const toggleWishListItem = async (productId, userId, token) => {
  try {
    return await axios.put(
      "https://fakestoreapi.com/products/wishlist",
      {
        userId: userId,
        productId: productId,
      },
      {
        headers: { authorization: token },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

//TODO: add shopping cart mutation and query and add functions
const ProductList = () => {
  const [showModal, setShowModal] = useState(false);
  const [delProduct, setDelProduct] = useState(); // todo load from backend wishlist items fot this user

  const queryClient = useQueryClient();
  const {
    isAuthenticated,
    userAuth,
    authHeader,
    deletePressed,
    setDeletePressed,
  } = useContext(ShopContext);

  /**
   * Executes two separate queries using the useQuery hook.
   * @returns {{
   *   wishListQuery: QueryResult - The result of the wish list query.
   *   productQuery: QueryResult - The result of the product query.
   * }}
   */
  const wishListQuery = useQuery({
    queryKey: ["wishListProducts"],
    queryFn: () => fetchWishList(userAuth?.ID),
  });
  const productQuery = useQuery({
    queryKey: ["ShopProducts"],
    queryFn: () => fetchProducts(),
  });

  const toggleLikeMutation = useMutation({
    mutationFn: (productId) =>
      toggleWishListItem(productId, userAuth.userId, authHeader),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["wishListProducts"] });

      const prevWishList = queryClient.getQueryData(["wishListProducts"]);

      queryClient.setQueryData(["wishListProducts"], (old) => [
        ...old,
        productId,
      ]);

      return { prevWishList };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["wishListProducts"], context.prevWishList);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishListProducts"] });
    },
  });

  if (productQuery.isError || wishListQuery.isError)
    return <div>Error fetching data {productQuery.error}</div>;

  const toggleLike = (productId) => {
    if (!isAuthenticated) {
      return; // toDO : add somthing to tell the user that he isnt logged in
    }

    toggleLikeMutation(productId);
  };
  const confirmDeletion = (productId) => {
    //TODO: aff remove from ShopProduct.data (call mutation ) and send a n api call to delete the productId
    setDelProduct(productId);
    setShowModal(true);
  };

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 cursor-pointer`}
      onClick={() =>
        setDeletePressed((prev) => {
          prev ? prev : false;
        })
      }>
      {productQuery.isLoading || wishListQuery.isLoading
        ? [...Array(20)].map((_, index) => <Skeleton key={index} />)
        : productQuery.data &&
          productQuery.data.map((product) => (
            <div
              key={product.id}
              className={`border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col relative ${
                deletePressed
                  ? "animate-pulse ease duration-1000"
                  : "duration-300"
              }`}>
              {deletePressed ? (
                <button
                  className='absolute top-2 right-4 text-red-500 text-4xl'
                  onClick={confirmDeletion}>
                  <IoClose />
                </button>
              ) : null}
              <Link
                className={`h-40 flex items-center justify-center ${
                  deletePressed ? "pointer-events-none" : ""
                }`}
                to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className='max-w-full max-h-full p-3'
                />
              </Link>
              <div className='p-4 flex-grow flex flex-col justify-between'>
                <h2 className='text-lg font-semibold mb-2 text-gray-800'>
                  {product.title}
                </h2>
                <div className=' flex flex-col'>
                  <div>
                    <p className='text-gray-600'>${product.price}</p>
                    <p className='text-gray-600'>
                      Category: {product.category}
                    </p>
                  </div>
                  <div
                    className={`flex flex-row-reverse justify-between mt-3 ${
                      deletePressed ? "pointer-events-none" : ""
                    }`}>
                    <button
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300'
                      onClick={(e) => {}}>
                      הוסף לסל
                    </button>
                    <button
                      className='ml-2 px-4 py-2 rounded hover:bg-gray-300 transition duration-300'
                      onClick={(e) => {
                        toggleLike(product.id);
                      }}>
                      {wishListQuery.data &&
                      wishListQuery.data.id === product.id ? (
                        <FaHeart color='#ff0000' />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        fn={() => DeleteProductMutation.mutate(delProduct)}
      />
    </div>
  );
};

export default ProductList;
