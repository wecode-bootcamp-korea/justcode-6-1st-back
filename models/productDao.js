const { DataSource } = require("typeorm");
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!!!!!!");
  })
  .catch(() => {
    console.log("Database initiate fail");
  });

const getProducts = async () => {
  const getProducts = await myDataSource.query(
    `
    SELECT 
      products.id as product_id,
      category_id,
      name,
      description,
      productor,
      image_thumbnail,
      bundle.price,
      created_at
    FROM products
    JOIN bundle ON products.id = bundle.product_id
    WHERE bundle.bundle_name = "소"
    `
  );
  return getProducts;
};
module.exports = { getProducts };
