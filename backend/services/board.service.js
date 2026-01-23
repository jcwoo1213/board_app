//보드관련 서비스 js
const pool = require("../db.js");
// insertBoard({
//   title: "test02 title",
//   content: "test02 content",
//   writer: "tester02",
// });
// findAll();
// delBoard(3);
//전체 목록
const service = {
  findAll: async function (page = 1) {
    const offset = (page - 1) * 10;
    // console.log(offset);
    let [rows, result] = await pool.query(
      "select * from board order by id limit 10 offset ?",
      [offset],
    );
    return rows;
  },
  create: async function (board = {}) {
    const { title, content, writer } = board;
    const query = `insert into board (title,content,writer) values(?,?,?);`;
    let result = await pool.query(query, [title, content, writer]);

    return result[0].insertId;
  },
  remove: async function (id) {
    const query = `delete from board where id=?`;
    let result = await pool.query(query, [id]);
    return result;
  },
  update: async function (board) {
    const { id, title, content } = board;
    const query = `update board set title=?,content=? where id=?; `;
    let result = await pool.query(query, [title, content, id]);
    return result[0].affectedRows;
  },
  findById: async function (id) {
    const query = `select * from board where id =?`;
    let [row, result] = await pool.query(query, [id]);
    return row[0];
  },
  getCount: async function () {
    const query = `select count(*) count from board`;
    let [row, result] = await pool.query(query);

    return row[0];
  },
};

module.exports = service;
