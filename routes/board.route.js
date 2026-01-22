//board.route
const router = require("express").Router();
const ctrl = require("../controllers/board.controller");

//boards/메인 호출시
router.get("/", ctrl.findAll);
//boards/id 하면 해당 글만
router.get("/:id", ctrl.detail);
// /create를 post로 호출시 create
router.post("/create", ctrl.create);
// /mod를 post로 호출시 수정
router.put("/:id", ctrl.update);
// boards/id를 delete로 하면 삭제
router.delete("/:id", ctrl.remove);

module.exports = router;
