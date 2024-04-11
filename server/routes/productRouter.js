const express = require('express');
const productRouter = express.Router();
const { getProducts, insertProduct, deleteProductFromDB } = require('../databaseWork');
const {upload} = require('../UploadProductImage');

// TODO test this code
productRouter.get('/', async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

productRouter.post('/', upload.single('product_image'), async (req, res) => {
    const { product_name, product_description, price, stock_quantity } = req.body;
    const imageUrl = req.file.path;
    try {
        const product = await insertProduct(product_name, product_description, price, stock_quantity, imageUrl);
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product' });
    }
});

productRouter.delete('/', async (req, res) => {
    const {product_id} = req.query;
    if (!product_id) {
        return res.status(400).json({ error: 'Product ID is required' });
    }
    try {
        const affectedRows = await deleteProductFromDB(product_id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
})


module.exports = productRouter;