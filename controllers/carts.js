const cartsService = require("../services/carts");

const createCarts = async (req, res) => {
  const { bundleId, quantity } = req.body;
  const userId = req.userId;
  await cartsService.createCarts(userId, bundleId, quantity);
  res.status(201).json({ message: "CREATE_CARTS" });
};

const getCarts = async (req, res) => {
  const userId = req.userId;
  const getCarts = await cartsService.getCarts(userId);
  res.status(200).json({ data: getCarts });
};

const updateCarts = async (req, res) => {
  const { cartsId, quantity } = req.body;
  const userId = req.userId;
  const updateCarts = await cartsService.updateCarts(userId, cartsId, quantity);
  res.status(200).json({ message: "UPDATE_CARTS" });
};

const deleteCarts = async (req, res) => {
  const { cartsId } = req.body;
  const userId = req.userId;
  const deleteCarts = await cartsService.deleteCarts(userId, cartsId);
  res.status(200).json({ message: "DELETE_CARTS" });
};

module.exports = { createCarts, getCarts, updateCarts, deleteCarts };
