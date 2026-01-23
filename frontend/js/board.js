import { svc } from "./boardService.js";
console.log(svc);
//board.js
let boardList = [];
let nowPage = 1;
let lastPage = 1;
let view = 10;
let endPage = 10;
let startPage = 1;
let viewPageBtn = 5;
let count = 0;
svc.getTotalCount(setData);
svc.getBoardList(1, printBoardList);

const title = document.querySelector("#title");
const content = document.querySelector("#content");
const writer = document.querySelector("#writer");

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  svc.writeBoard(
    {
      title: title.value,
      content: content.value,
      writer: writer.value,
    },
    writeCheck,
  );
});
//목록 불러오기
// function loadBoards(page = 1) {
//   fetch(API_URL + `/pg/${page}`)
//     .then((resp) => resp.json())
//     .then((data) => {
//       // boardList=data.rows;
//       printBoardList(data.rows);
//       printPageBtn();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

//보드 출력하기
function printBoardList(result) {
  if (!result.rows.length) {
    nowPage--;
    svc.getBoardList(nowPage, printBoardList);
    return;
  }

  const target = document.querySelector("#list");
  target.innerHTML = "";
  const list = result.rows;
  for (const element of list) {
    target.appendChild(makeTr(element));
  }
}

//한행 만들기
function makeTr(board) {
  const trTag = document.createElement("tr");
  // console.log(board);
  const listViews = ["id", "title", "writer", "created_at"];
  for (const elem of listViews) {
    const tdTag = document.createElement("td");
    if (elem == "title") {
      const aTag = document.createElement("a");
      aTag.innerText = board[elem];
      tdTag.appendChild(aTag);
      aTag.dataset.id = board["id"];
      aTag.addEventListener("click", (e) => {
        console.log(e.target.dataset.id);
      });
    } else if (elem == "created_at") {
      tdTag.innerText = svc.formatDate(new Date(board[elem]));
    } else {
      tdTag.innerText = board[elem];
    }

    trTag.appendChild(tdTag);
  }
  const btnTag = document.createElement("button");
  btnTag.innerText = "삭제";
  btnTag.className = "btn btn-danger";
  btnTag.dataset.id = board["id"];
  btnTag.addEventListener("click", function () {
    const id = this.dataset.id;
    svc.delBoard(id, delCheck);
  });
  const tdTag = document.createElement("td");
  tdTag.appendChild(btnTag);
  trTag.appendChild(tdTag);

  return trTag;
}

//갯수 받아와서 마지막 페이지 계산하기
function setData(res) {
  count = res;
  lastPage = Math.ceil(count / view);
  nowPage = Math.min(nowPage, lastPage);
  console.log(`last:${lastPage}`);
  console.log(`now:${nowPage}`);
  printPageBtn();
}

//버튼 출력
function printPageBtn() {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  endPage = Math.ceil(nowPage / viewPageBtn) * viewPageBtn;
  startPage = endPage - (viewPageBtn - 1);
  endPage = Math.min(lastPage, endPage);
  console.log(nowPage);
  pagination.appendChild(printAsideBtn("이전"));

  for (let i = startPage; i <= endPage; i++) {
    const liTag = document.createElement("li");
    liTag.className = "page-item";
    const aTag = document.createElement("a");
    aTag.href = "#";
    aTag.dataset.page = i;
    aTag.innerText = i;
    aTag.classList = "page-link";
    if (i == nowPage) {
      aTag.classList.add("active");
    }
    aTag.addEventListener("click", function (e) {
      nowPage = this.dataset.page;
      svc.getBoardList(nowPage, printBoardList);
      svc.getTotalCount(setData);
    });
    liTag.appendChild(aTag);
    pagination.appendChild(liTag);
  }
  pagination.appendChild(printAsideBtn("다음"));
}

//양 사이드 출력
function printAsideBtn(func) {
  const liTag = document.createElement("li");
  liTag.className = "page-item";
  const aTag = document.createElement("a");
  aTag.href = "#";
  if (func == "이전") {
    if (startPage == 1) {
      liTag.classList.add("disabled");
      aTag.setAttribute("aria-disabled", "true");
    }
    aTag.innerText = "<<";
    aTag.dataset.page = startPage - 1;
  } else {
    if (endPage == lastPage) {
      liTag.classList.add("disabled");
      aTag.setAttribute("aria-disabled", "true");
    }
    aTag.innerText = ">>";
    aTag.dataset.page = endPage + 1;
  }
  aTag.classList = "page-link";
  aTag.addEventListener("click", function (e) {
    nowPage = this.dataset.page;
    svc.getBoardList(nowPage, printBoardList);
    svc.getTotalCount(setData);
  });
  liTag.appendChild(aTag);

  return liTag;
}
//정상입력 체크
function writeCheck(result) {
  if (result.retCode == "OK") {
    alert("정상 입력되었습니다");
    title.value = "";
    content.value = "";
    writer.value = "";
  } else {
    alert("입력실패");
  }
}
//삭제 체크
function delCheck(result) {
  if (result.retCode == "OK") {
    alert("정상 삭제되었습니다");
    svc.getTotalCount(setData);
    svc.getBoardList(nowPage, printBoardList);
  } else {
    alert("입력실패");
  }
}
