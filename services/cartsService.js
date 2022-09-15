const cartsDao = require('../models/cartsDao');

const createCart = async (userId, bundleId, quantity) => {
  const isExists = await cartsDao.existCheckCart(userId, bundleId);
  if (isExists) {
    return await cartsDao.plusQuantity(userId, bundleId);
  }
  return await cartsDao.createCart(userId, bundleId, quantity);
};

const getCarts = async (userId) => {
  const DELIVERY_FEE = 3500;
  const FREE_DELIVERY_PRICE = 50000;

  const carts = await cartsDao.getCartInfo(userId);
  const cartsDetail = await cartsDao.getCartDetailInfo(userId);
  const totalPrice = Number(cartsDetail[0].total_price);
  const userName = cartsDetail[0].name;

  const deliveryFeeByCart = () => {
    const totalPriceBycart = carts.map((cart) => cart.priceByCart);
    let result = [];
    for (let i = 0; i < totalPriceBycart.length; i++) {
      if (totalPriceBycart[i] < FREE_DELIVERY_PRICE) {
        result.push(DELIVERY_FEE);
      }
    }
    const totalDeliveryFee = result.reduce((prev, curr) => prev + curr, 0);
    return totalDeliveryFee;
  };

  const totalDeliveryFee = Number(deliveryFeeByCart());

  return {
    name: userName,
    cartList: carts,
    totalPrice: totalPrice,
    totalQantity: Number(cartsDetail[0].total_quantity),
    deliveryFee: totalDeliveryFee,
    orderPrice: totalPrice + totalDeliveryFee,
  };
};

const updateCart = async (userId, cartsId, quantity) => {
  return await cartsDao.updateCart(userId, cartsId, quantity);
};

const deleteCart = async (userId, cartsId) => {
  return await cartsDao.deleteCarts(userId, cartsId);
};

module.exports = { createCart, getCarts, updateCart, deleteCart };
