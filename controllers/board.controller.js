//board.controller
const service = require("../services/board.service");
console.log(service);

const ctrl = {
  //글 목록 전체
  findAll: async (req, res) => {
    const rows = await service.findAll();
    if (rows) {
      res.json({ retCode: "OK", rows });
    } else {
      res.json({ retCode: "NG" });
    }
  },
  //글생성
  create: async (req, res) => {
    console.log(req.body);
    const result = await service.create({
      title: req.body.title,
      content: req.body.content,
      writer: req.body.writer,
    });
    if (result) {
      res.json({ retCode: "OK" });
    } else {
      res.json({ retCode: "NG" });
    }
  },
  //삭제
  remove: async (req, res) => {
    const id = req.params.id;
    const result = await service.remove(id);
    if (result) {
      res.json({ retCode: "OK", del_num: id });
    } else {
      res.json({ retCode: "NG" });
    }
  },
  //수정
  update: async (req, res) => {
    console.log(req.body);
    const board = {
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
    };

    const result = await service.update(board);
    if (result) {
      res.json({ retCode: "OK" });
    } else {
      res.json({ retCode: "NG" });
    }
  },
  //하나만
  detail: async (req, res) => {
    console.log(req.params.id);
    const result = await service.findById(req.params.id);
    if (result) {
      res.json({ retCode: "OK", result });
    } else {
      res.json({ retCode: "NG" });
    }
  },
};
module.exports = ctrl;
