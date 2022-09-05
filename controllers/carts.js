const cartsService = require("../services/carts");

const createCarts = async (req, res) => {
  const { userId, bundleId, quantity } = req.body;
  const createCarts = await cartsService.createCarts(
    userId,
    bundleId,
    quantity
  );
  res.status(201).json({ message: "CREATE_CARTS" });
};

const getCarts = async (req, res) => {
  const { userId } = req.body;
  const getCarts = await cartsService.getCarts(userId);
  res.status(200).json({ data: getCarts });
};

module.exports = { createCarts, getCarts };
