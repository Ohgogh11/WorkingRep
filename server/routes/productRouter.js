const express = require("express");
const productRouter = express.Router();
const {
  getProducts,
  insertProduct,
  deleteProductFromDB,
} = require("../databaseWork");
const { upload } = require("../UploadProductImage");
/**
 * Route handler for getting all products.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the products are fetched and sent as a JSON response.
 */
productRouter.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});
/**
 * POST endpoint for creating a new product.
 * @param {Object} req - The request object containing the product details in the body.
 * @param {Object} res - The response object to send back the result of the operation.
 * @returns None
 */
productRouter.post("/", upload.single("imageFile"), async (req, res) => {
  const { productName, description, price, stockQuantity } = req.body;
  const imageUrl = `api/images/${req.file.filename}`;

  console.table(req.body);
  console.log(imageUrl);
  try {
    const product = await insertProduct(
      productName,
      description,
      price,
      stockQuantity,
      imageUrl
    );
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
});
/**
 * Route handler for deleting a product from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response indicating success or failure of the deletion operation.
 */
productRouter.delete("/", async (req, res) => {
  const { product_id } = req.query;
  if (!product_id) {
    return res.status(400).json({ error: "Product ID is required" });
  }
  try {
    const affectedRows = await deleteProductFromDB(product_id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
module.exports = productRouter;
