require("dotenv").config();
const { createApp } = require("./app");
const app = createApp();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

<<<<<<< HEAD
const cors = require("cors");
app.use(cors());

=======
>>>>>>> 0fb6154 ([add]: 마이페이지-내정보 (토큰오류 발생))
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
