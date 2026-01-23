//boardService.js (모듈기능제공)
const API_URL = "http://localhost:3000/boards";

const svc = {
  getBoardList(page, callback) {
    fetch(API_URL + `/pg/${page}`)
      .then((resp) => resp.json())
      .then(callback)
      .catch((err) => {
        console.log(err);
      });
  },
  getTotalCount(callback) {
    fetch(API_URL + `/count`)
      .then((resp) => resp.json())
      .then((resp) => resp.count)
      .then(callback);
  },
  formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();
    // 날짜 포맷 출력 => yyyy-mm-dd HH:MM:SS 형태출력 메소드.
    return `${yyyy}-${("0" + mm).slice(-2)}-${("0" + dd).slice(-2)} ${("0" + hh).slice(-2)}:${("0" + mi).slice(-2)}`;
  },
  writeBoard(data, callback) {
    fetch(API_URL + `/create`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(callback)
      .catch((err) => {
        console.log(err);
      });
  },
  delBoard(id, callback) {
    fetch(API_URL + `/${id}`, {
      method: "delete",
    })
      .then((resp) => resp.json())
      .then(callback);
  },
};

export { svc };
