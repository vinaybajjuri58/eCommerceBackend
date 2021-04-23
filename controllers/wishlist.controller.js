const { Wishlist } = require("../models/wishlist.model");
const getAllWishlistItems = async (req, res) => {
  let wishlistItems;
  try {
    wishlistItems = await Wishlist.find({}).populate("_id");
    const normalizedWishlistItems = wishlistItems.map((item) => {
      const { _id, ...doc } = item._id._doc;
      return { id: _id, ...doc };
    });
    res.json({
      success: true,
      wishlistItems: normalizedWishlistItems,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error in getting wishhlist data",
      errMessaage: err.errMessaage,
    });
  }
};
const addWishlistItem = async (req, res) => {
  const wishlistItem = req.body;
  const newWishlistItem = new Wishlist(wishlistItem);
  try {
    const savedWishlistItem = await newWishlistItem.save();
    res.status(201).json({
      success: true,
      message: "Added a new Item to Wishlist",
      WishlistItem: savedWishlistItem,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Error in adding a new product to Wishlist",
      errMessage: err.errMessage,
    });
  }
};
const deleteWishlistItem = async (req, res) => {
  try {
    const { wishlistItem } = req;
    await wishlistItem.remove();
    res.json({
      success: true,
      message: "Deleted  Wishlist Item",
      wishlistItem,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "error in deleting a Wishlist Item",
      errMessage: err.errMessage,
    });
  }
};
module.exports = {
  getAllWishlistItems,
  addWishlistItem,
  deleteWishlistItem,
};
