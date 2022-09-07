const cartsService = require("../services/cartsService");

const createCart = async (req, res) => {
  const { bundleId, quantity } = req.body;
  const userId = req.userId;
  try {
    await cartsService.createCart(userId, bundleId, quantity);
    res.status(201).json({ message: "CREATE_CARTS" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getCarts = async (req, res) => {
  const userId = req.userId;
  try {
    const getCarts = await cartsService.getCarts(userId);
    res.status(200).json({ data: getCarts });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updateCart = async (req, res) => {
  const { cartsId, quantity } = req.body;
  const userId = req.userId;
  try {
    await cartsService.updateCart(userId, cartsId, quantity);
    res.status(200).json({ message: "UPDATE_CARTS" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteCarts = async (req, res) => {
  const { cartsId } = req.body;
  const userId = req.userId;
  try {
    await cartsService.deleteCarts(userId, cartsId);
    res.status(200).json({ message: "DELETE_CARTS" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { createCart, getCarts, updateCart, deleteCarts };
