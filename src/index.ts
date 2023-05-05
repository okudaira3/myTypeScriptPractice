import { FireBase } from "./firebase"

let nickname: HTMLInputElement
let message: HTMLTextAreaElement
let tBody: HTMLTableElement

type firebaseData = {
  nickname: string
  message: string
  posted: number | Date
}

const firebase = new FireBase(
  "https://firsttypescriptapp-default-rtdb.asia-southeast1.firebasedatabase.app/boards.json"
)

async function onSendBtnClick() {
  const data: firebaseData = {
    nickname: nickname.value,
    message: message.value,
    posted: new Date().getTime(),
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
    let item: firebaseData = messages[k]

    tbody =
      ` <tr>
          <td> ${item.message}</td>
          <td> ${item.nickname}</td>
          <td> ${new Date(item.posted).toLocaleString()}</td>
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

  const messages = await firebase.fetchData()
  updateTable(messages)
})
