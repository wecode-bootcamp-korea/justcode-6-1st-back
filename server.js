require("dotenv").config();
const http = require("http");
const { createApp } = require("./app");
const app = createApp();
const server = http.createServer(app);
const PORT = 5000;

const cors = require("cors");
app.use(cors("http://localhost:3000"));

server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
