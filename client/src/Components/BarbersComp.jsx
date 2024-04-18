import React from "react";

function BarbersComp({ barber, onSelect }) {
  const handleClick = () => {
    onSelect(barber.username); // Pass the received barber object
  };
  return (
    <div
      onClick={handleClick}
      className="w-24 text-center p-2 border border-gray-300 border-dashed ">
      {barber.username}
    </div>
  );
}

export default BarbersComp;
