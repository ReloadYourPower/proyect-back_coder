const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      req.flash('error_msg', 'Product not found');
      return res.redirect('/products');
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, products: [] });
    }

    cart.products.push(product);
    await cart.save();

    req.flash('success_msg', 'Product added to cart');
    res.redirect('/cart');
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/products');
  }
};

const viewCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products');
    res.render('cart', { cart });
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/');
  }
};

module.exports = {
  addToCart, viewCart
}
