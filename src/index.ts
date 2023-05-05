import { FireBase } from "./firebase"

let nickname: HTMLInputElement
let message: HTMLTextAreaElement
let tBody: HTMLTableElement

const firebase = new FireBase(
  "https://firsttypescriptapp-default-rtdb.asia-southeast1.firebasedatabase.app/boards.json"
)

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

  try {
    await firebase.post2fireBase(data)
    const messages = await firebase.fetchData()
    updateTable(messages)

    // 送信後はテキストボックスをクリアする
    nickname.value = ""
    message.value = ""
  } catch (error) {
    console.error(error)
    alert("データの送信に失敗しました。")
  }
}

async function onAllDeleteBtnClick() {
  try {
    await firebase.allDelete()
    const messages = await firebase.fetchData()
    updateTable(messages)
  } catch (error) {
    console.error(error)
    alert("データの送信に失敗しました。")
  }
}

function updateTable(messages: object) {
  let tbody = ""
  for (const k in messages) {
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
  // DOMを変数にセット
  message = document.querySelector("#message")
  nickname = document.querySelector("#nickname")
  tBody = document.querySelector("#table tbody")

  // ボタンにイベントを追加
  const sendBtn: HTMLButtonElement = document.querySelector("#send-btn")
  sendBtn.onclick = onSendBtnClick

  const delBtn: HTMLButtonElement = document.querySelector("#all-delete-btn")
  delBtn.onclick = onAllDeleteBtnClick

  // fetchData(firebaseUrl)
  const messages = await firebase.fetchData()
  updateTable(messages)
})
