import { allDelete } from "./firebase"
import { post2fireBase } from "./firebase"
import { fetchData } from "./firebase"

let nickname: HTMLInputElement
let message: HTMLTextAreaElement
let tBody: HTMLTableElement
const firebaseUrl = "https://firsttypescriptapp-default-rtdb.asia-southeast1.firebasedatabase.app/boards.json"

enum DataProperty {
  nickname = "nickname",
  message = "message",
  posted = "posted",
}

async function onSendBtnClick() {
  const data = {
    [DataProperty.nickname]: nickname.value,
    [DataProperty.message]: message.value,
    [DataProperty.posted]: new Date().getTime(),
  }

  await post2fireBase(firebaseUrl, data)
  const messages = await fetchData(firebaseUrl)
  updateTable(messages)
}

async function onAllDeleteBtnClick() {
  await allDelete(firebaseUrl)
  const messages = await fetchData(firebaseUrl)
  updateTable(messages)
}

function updateTable(messages: any) {
  let tbody = ""
  for (let k in messages) {
    let item = messages[k]

    tbody =
      ` <tr>
                  <td> ${item[DataProperty.message]}</td>
                  <td> ${item[DataProperty.nickname]}</td>
                  <td> ${new Date(item[DataProperty.posted]).toLocaleString()}</td>
                </tr>
      ` + tbody
  }

  tBody.innerHTML = "" // 既存分を一旦クリア
  tBody.innerHTML = tbody
}

window.addEventListener("load", async () => {
  // DOMを変数に追加
  message = document.querySelector("#message")
  nickname = document.querySelector("#nickname")
  tBody = document.querySelector("#table tbody")

  // ボタンにイベントを追加
  const sendBtn: HTMLButtonElement = document.querySelector("#send-btn")
  sendBtn.onclick = onSendBtnClick

  const delBtn: HTMLButtonElement = document.querySelector("#all-delete-btn")
  delBtn.onclick = onAllDeleteBtnClick

  // fetchData(firebaseUrl)
  const messages = await fetchData(firebaseUrl)
  updateTable(messages)
})
