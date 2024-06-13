import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductSlider from "./ProductSlider";

const URL = "https://fakestoreapi.com/products?limit=10";

function ShopPreview() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["productPreview"],
    queryFn: async () => {
      try {
        const Response = await axios.get(URL);
        console.log("fetching");
        return Response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data + {error.message}</div>;
  }

  console.log(data);
  return (
    <div className='container text-center  overflow-hidden h-fit w-fit max-w-3xl'>
      <h1 className='font-bold text-2xl my-3'>המוצרים שלנו</h1>
      <div className=' container bg-gray-300  xxs:max-w-[350px]'>
        <ProductSlider items={data} />
      </div>
    </div>
  );
}

export default ShopPreview;
