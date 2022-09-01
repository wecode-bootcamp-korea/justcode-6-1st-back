const productService = require("../services/product");

const getProducts = async (req, res) => {
  try {
    const list = await productService.getProducts();
    res.status(200).json({ data: list });
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

const getProductsByCategory = async (req, res) => {
  try {
    const pageInfo = req.query;
    const category = pageInfo["category"];
    const orderBy = pageInfo["orderBy"];
    const list = await productService.getProductsByCategory(category, orderBy);
    res.status(200).json({ data: list });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getProductsBySearch = async (req, res) => {
  try {
    const pageInfo = req.query;
    const word = pageInfo["name"];
    if (!word) {
      return res.status(400).json({ message: "NONE_WORD" });
    }
    const list = await productService.getProductsBySearch(word);

    res.status(200).json({ data: list });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductsById,
  getProductsByCategory,
  getProductsBySearch,
};
