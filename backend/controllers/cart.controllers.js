const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");

module.exports.addItemToCart = async (req, res, next) => {
  const { productId } = req.body;

  try {
    let cart = await cartModel.findOne({ userId: req.user._id });

    // Check if cart exists for the user
    if (!cart) {
      cart = new cartModel({ userId: req.user._id, items: [], amount: 0 });
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.items.findIndex(
      (item) => String(item.productId) === String(productId)
    );

    if (itemIndex === -1) {
      // If product does not exist, add it to the cart with quantity 1
      cart.items.push({ productId, quantity: 1 });
    }

    // Calculate total amount
    const productIds = cart.items.map((item) => item.productId);
    const products = await productModel.find({ _id: { $in: productIds } });

    cart.amount = cart.items.reduce((total, item) => {
      const product = products.find(
        (p) => String(p._id) === String(item.productId)
      );
      return total + product.price * item.quantity;
    }, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

module.exports.getUserCart = async (req, res, next) => {
  try {
    const cart = await cartModel
      .findOne({ userId: req.user._id })
      .populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

module.exports.updateCart = async (req, res, next) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await cartModel.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => String(item.productId) === String(productId)
    );

    if (itemIndex > -1) {
      // Update the quantity of the product in the cart
      cart.items[itemIndex].quantity = quantity;

      // Recalculate total amount
      const productIds = cart.items.map((item) => item.productId);
      const products = await productModel.find({ _id: { $in: productIds } });

      cart.amount = cart.items.reduce((total, item) => {
        const product = products.find(
          (p) => String(p._id) === String(item.productId)
        );
        return total + product.price * item.quantity;
      }, 0);

      await cart.save();
      res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.removeItemFromCart = async (req, res, next) => {
  const { productId } = req.body;

  try {
    const cart = await cartModel.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter(
      (item) => String(item.productId) !== String(productId)
    );

    // Recalculate total amount
    const productIds = cart.items.map((item) => item.productId);
    const products = await productModel.find({ _id: { $in: productIds } });

    cart.amount = cart.items.reduce((total, item) => {
      const product = products.find(
        (p) => String(p._id) === String(item.productId)
      );
      return total + product.price * item.quantity;
    }, 0);

    await cart.save();

    res.status(200).json({ message: "removed", cart });
  } catch (error) {
    next(error);
  }
};
