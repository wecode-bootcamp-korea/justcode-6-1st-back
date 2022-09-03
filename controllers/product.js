const productService = require("../services/product");

const getProducts = async (req, res) => {
  try {
    const pageInfo = req.query;
    const category = pageInfo["category"];
    const search = pageInfo["search"];
    const orderBy = pageInfo["orderBy"];
    const getProducts = await productService.getProducts(
      category,
      search,
      orderBy
    );
    res.status(200).json({ data: getProducts });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getProductsById = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const list = await productService.getProductsById(productId);
    res.status(200).json({ data: list });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductsById,
};
