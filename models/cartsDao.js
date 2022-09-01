const { myDataSource } = require("./dataSource");

const creatCarts = async (product, arrivedAt, deliveryCharge, quantity) => {
  try {
    const creatCarts = await myDataSource.query(
      `
    INSERT INTO 
      
    FROM bundle
    JOIN bundle ON products.id = bundle.product_id
    WHERE bundle.bundle_name = "소"
    `
    );
    return creatCarts;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

module.exports = { creatCarts };
