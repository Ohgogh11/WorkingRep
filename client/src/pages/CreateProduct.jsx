import axios from "axios";
import React, { useState } from "react";

function CreateProduct() {
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: 0.0, // Initialize price as a number
    stockQuantity: 0, // Initialize stock as an integer
  });
  const [imageFile, setImageFile] = useState();
  const [errorMessage, setErrorMessage] = useState(""); // For validation errors

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value, // Update specific property based on input ID
    });
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0]; // Get the first selected file
    console.log("selectedFile" + selectedFile);
    if (!selectedFile) {
      return; // Handle no file selected
    }
    // Validation (optional): Check file type, size, etc.
    if (!selectedFile.type.match("image/.*")) {
      setErrorMessage("Please select an image file.");
      return;
    }

    setImageFile(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Basic validation (can be enhanced)
    if (
      !form.productName ||
      !form.description ||
      form.price < 0 ||
      form.stockQuantity < 0 ||
      !imageFile
    ) {
      setErrorMessage(
        "Please fill in all required fields and ensure valid values."
      );
      return;
    }

    // productName: "",
    // description: "",
    // price: 0.0, // Initialize price as a number
    // stockQuantity: 0, // Initialize stock as an integer
    // Handle form submission logic here, including product data (formData)
    const formData = new FormData();
    formData.append("productName", form.productName);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stockQuantity", form.stockQuantity);
    formData.append("imageFile", imageFile);

    axios.post("/api/products", formData).then((response) => {
      if (response.status === 200) {
        alert("Success");
      }
    });

    // Clear form fields after successful submission (optional)
    // setFormData({
    //   productName: "",
    //   description: "",
    //   price: 0.0,
    //   stockQuantity: 0,
    //   imageFile: "",
    // });
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            value={form.productName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <div className="w-full">
            <label className="block text-sm font-medium mb-2" htmlFor="price">
              Price:
            </label>
            <input
              type="number"
              id="price"
              min="1" // Minimum price of 0.01
              step="0.01" // Increment by 0.01 (two decimal places)
              value={form.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus
                  :outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium mb-2" htmlFor="stock">
              Stock Quantity:
            </label>
            <input
              type="number"
              id="stockQuantity"
              min="0" // Minimum stock of 0
              value={form.stockQuantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="image">
            Image:
          </label>
          <input
            type="file" // Use type="file" for image upload
            id="image"
            accept="image/*" // Accept only image files
            onChange={handleImageUpload}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        {errorMessage && (
          <>
            <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
            <button onClick={setErrorMessage("")}>
              <ion-icon name="close" />
            </button>
          </>
        )}
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Product
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
