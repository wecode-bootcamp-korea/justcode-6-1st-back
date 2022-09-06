const cartsService = require("../services/carts");

const createCarts = async (req, res) => {
  const { userId, bundleId, quantity } = req.body;
  await cartsService.createCarts(userId, bundleId, quantity);
  res.status(201).json({ message: "CREATE_CARTS" });
};

const getCarts = async (req, res) => {
  const { userId } = req.params;
  const getCarts = await cartsService.getCarts(userId);
  res.status(200).json({ data: getCarts });
};

const updateCarts = async (req, res) => {
  const { userId, cartsId, quantity } = req.body;
  const updateCarts = await cartsService.updateCarts(userId, cartsId, quantity);
  res.status(200).json({ message: "UPDATE_CARTS" });
};

const deleteCarts = async (req, res) => {
  const { userId, cartsId } = req.body;
  const deleteCarts = await cartsService.deleteCarts(userId, cartsId);
  res.status(200).json({ message: "DELETE_CARTS" });
};

module.exports = { createCarts, getCarts, updateCarts, deleteCarts };
