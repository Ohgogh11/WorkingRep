import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
function Loading() {
  return (
    <div className=' h-full-Screen flex justify-center items-center'>
      <ClipLoader
        cssOverride={true}
        size={150}
        color={"#000000"}
        loading={true}
      />
    </div>
  );
}

export default Loading;
