const cartsService = require("../services/carts");

const creatCarts = async (req, res) => {
  const { product, arrivedAt, deliveryCharge, quantity } = req.body;
  const creatCarts = await cartsService.creatCarts(
    product,
    arrivedAt,
    deliveryCharge,
    quantity
  );
  res.status(200).json({ message: "CREATE_CARTS" });
};

module.exports = { creatCarts };
