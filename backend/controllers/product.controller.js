const productModel = require("../models/product.model");
const shopModel = require("../models/shop.model");
const WishlistModel = require("../models/wishlist.model");
const cartModel = require("../models/cart.model");

// Add helper functions at top
const addWishlistStatus = async (products, userId = null) => {
  if (!userId) return products;

  const wishlist = await WishlistModel.findOne({ userId });
  const wishlistedProducts = wishlist
    ? wishlist.products.map((p) => p.toString())
    : [];

  return products.map((product) => ({
    ...product.toObject(),
    isWishlisted: wishlistedProducts.includes(product._id.toString()),
  }));
};
const addCartStatus = async (products, userId = null) => {
  if (!userId) return products;

  const cart = await cartModel.findOne({ userId });
  const cartProductIds = cart
    ? cart.items.map((item) => item.productId.toString())
    : [];

  return products.map((product) => ({
    ...product,
    isInCart: cartProductIds.includes(product._id.toString()),
  }));
};

module.exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, discount, price } = req.body;

    if (!name || !description || !category || !price) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const shop = await shopModel.findOne({ owner: req.user._id });
    if (!shop) {
      return res.status(400).json({
        message: "Seller shop not found",
      });
    }

    const product = await productModel.create({
      name,
      description,
      category,
      discount: discount || 0,
      price,
      seller: shop._id,
    });

    const images = req.files
      .map((file) => file.publicUrl)
      .filter((url) => (url ? true : false));

    product.images = images;
    await product.save();

    await shopModel.updateOne(
      { _id: shop._id },
      { $push: { products: product._id } }
    );

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    // res.status(500).json(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id; // Get the product ID from the request parameters
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isActive = false; // Mark the product as inactive
    await product.save();

    res.status(200).json({ message: "Product blacklisted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({ isActive: true });
    const productsWithWishlist = await addWishlistStatus(
      products,
      req.user?._id
    );
    const productsWithWishlistAndCart = await addCartStatus(
      productsWithWishlist,
      req.user?._id
    );

    res.status(200).json({
      products: productsWithWishlistAndCart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getWomensWear = async (req, res, next) => {
  try {
    const products = await productModel.find({
      category: "womenswear",
      isActive: true,
    });
    const productsWithWishlist = await addWishlistStatus(
      products,
      req.user?._id
    );

    const productsWithWishlistAndCart = await addCartStatus(
      productsWithWishlist,
      req.user?._id
    );

    res.status(200).json({
      products: productsWithWishlistAndCart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getMensWear = async (req, res, next) => {
  try {
    const products = await productModel.find({
      category: "menswear",
      isActive: true,
    });
    const productsWithWishlist = await addWishlistStatus(
      products,
      req.user?._id
    );
    const productsWithWishlistAndCart = await addCartStatus(
      productsWithWishlist,
      req.user?._id
    );

    res.status(200).json({
      products: productsWithWishlistAndCart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getKidsWear = async (req, res, next) => {
  try {
    const products = await productModel.find({
      category: "kids",
      isActive: true,
    });
    const productsWithWishlist = await addWishlistStatus(
      products,
      req.user?._id
    );
    const productsWithWishlistAndCart = await addCartStatus(
      productsWithWishlist,
      req.user?._id
    );

    res.status(200).json({
      products: productsWithWishlistAndCart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getSaleItems = async (req, res, next) => {
  try {
    const products = await productModel.find({
      discount: { $gt: 0 },
      isActive: true,
    });
    const productsWithWishlist = await addWishlistStatus(
      products,
      req.user?._id
    );
    const productsWithWishlistAndCart = await addCartStatus(
      productsWithWishlist,
      req.user?._id
    );

    res.status(200).json({
      products: productsWithWishlistAndCart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findOne({
      _id: req.params.id,
      isActive: true,
    });

    const [productWithWishlist] = await addWishlistStatus(
      [product],
      req.user?._id
    );
    const productsWithWishlistAndCart = await addCartStatus(
      productsWithWishlist,
      req.user?._id
    );

    res.status(200).json({
      products: productsWithWishlistAndCart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.searchProducts = async (req, res, next) => {
  try {
    const { searchQuery } = req.query;
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchPattern = new RegExp(searchQuery, "i");
    const products = await productModel.find({
      name: { $regex: searchPattern },
      isActive: true,
    });
    const productsWithWishlist = await addWishlistStatus(
      products,
      req.user?._id
    );
    const productsWithWishlistAndCart = await addCartStatus(
      productsWithWishlist,
      req.user?._id
    );

    res.status(200).json({
      products: productsWithWishlistAndCart,
    });
  } catch (error) {
    next(error);
  }
};
