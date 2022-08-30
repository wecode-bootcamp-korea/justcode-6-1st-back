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
    console.log("Data Source has been initialized");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database initiate fail");
  });

const createUser = async (email, hashedPw, name, phoneNumber) => {
  // console.log("model 1");

  const user = await myDataSource.query(
    `
    INSERT INTO users(email, password, name, phoneNumber)
    VALUES (?, ?, ?, ?)
  `,
    [email, hashedPw, name, phoneNumber]
  );
  // console.log("model 2");
  return user;
};

// function readUserByEmail(email) {}

module.exports = { createUser };
