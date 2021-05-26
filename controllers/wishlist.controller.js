const { Wishlist } = require("../models/wishlist.model");
const mongoose = require("mongoose");
const getAllWishlistItems = async (req, res) => {
  let wishlistItems;
  const user = req.user;
  try {
    wishlistItems = user.wishlist;
    const normalizedWishlistItems = wishlistItems.map((item) => {
      const { _id, ...doc } = item._id._doc;
      return { _id: _id, ...doc };
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
  const user = req.user;
  const newWishlistItem = new Wishlist(wishlistItem);
  try {
    const session = await mongoose.startSession();
    await session.startTransaction();
    const savedWishlistItem = await newWishlistItem.save({ session: session });
    user.wishlist.push(savedWishlistItem._id);
    await user.save({ session: session });
    session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "Added a new Item to Wishlist",
      wishlistItem: savedWishlistItem,
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
  const user = req.user;
  try {
    const { wishlistItem } = req;
    const session = await mongoose.startSession();
    await session.startTransaction();
    user.wishlist.pull(wishlistItem._id);
    await user.save({ session: session });
    await wishlistItem.remove({ session: session });
    session.commitTransaction();
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
