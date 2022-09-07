const productService = require("../services/productService");

const getProducts = async (req, res) => {
  const pageInfo = req.query;
  const category = pageInfo["category"];
  const search = pageInfo["search"];
  const orderBy = pageInfo["orderBy"];
  const page = parseInt(pageInfo["page"]);
  const pagesize = parseInt(pageInfo["pageSize"]);
  try {
    const getProducts = await productService.getProducts(
      category,
      search,
      orderBy,
      page,
      pagesize
    );
    res.status(200).json({ data: getProducts });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const list = await productService.getProductById(productId);
    res.status(200).json({ data: list[0] });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
