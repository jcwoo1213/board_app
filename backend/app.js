//app.js
const express = require("express");
const app = express();
const mysql = require("mysql2");
const ctrl = require("./controllers/board.controller");
const boardRoute = require("./routes/board.route");
const cors = require("cors");
app.use(cors());
app.use(express.json()); //제이슨 데이터 처리
app.listen(3000, () => {
  console.log("서버실행 http://localhost:3000");
});
// /boards아래에 호출하는거는 저기로 다 던져줌
app.use("/boards", boardRoute);

app.get("/", (req, res) => {
  res.send("/ 경로호출");
});
