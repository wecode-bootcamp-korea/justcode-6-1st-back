const productService = require("../services/product");

const getProducts = async (req, res) => {
  try {
    const getProducts = await productService.getProducts();
    res.status(200).json({ data: getProducts });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getProducts };
