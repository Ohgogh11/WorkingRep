const express = require('express');
const wishlistRouter = express.Router(); // 
const {doesUserExist,insertBanndedUser} = require('../databaseWork');



// updates the wishlist table // TODO: need to change the database function and add the actual functions to the database file 
wishlistRouter.post('/', async (req,res)=>{
    const {userId} = req.query; // TODO: change to req.body and add the function in the client

    if (!userId ){
        return res.status(404).json({message:'userId or productId are null'});
    }
    if ((await doesUserExist(userId))!== true) {
        return res.status(404).json({ message: 'userId or productId does not exist' });
    }
    try {
        console.log('entered try catch')
        const affectedRows = await insertToWishList(userId, productId);
        return res.status(200).json(affectedRows);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});

wishlistRouter.delete('/', async (req,res)=>{
    const {userId, productId} = req.query; // TODO: change to req.body and add the function in the client

    if (!userId || !productId){
        return res.status(404).json({message:'userId or productId are null'});
    }
    if ((await doesProductExists(productId)) !== true || (await doesUserExist(userId)) !== true) {
        return res.status(404).json({ message: 'userId or productId does not exist' });
    }

    try {
        const affectedRows = await deleteWishList(userId, productId);
        return res.status(200).json(affectedRows);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
});

module.exports = wishlistRouter;    
