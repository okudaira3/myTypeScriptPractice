import { METHODS } from "http"

let nickname: HTMLInputElement
let message: HTMLTextAreaElement
let tBody: HTMLTableElement
// const firebaseUrl = "https://firsttypescriptapp.firebaseio.com/boards.json"
const firebaseUrl = "https://firsttypescriptapp-default-rtdb.asia-southeast1.firebasedatabase.app/boards.json"

function send(): void {
  const data = {
    nickname: nickname.value,
    message: message.value,
    posted: new Date().getTime(),
  }
  post2fireBase(firebaseUrl, data)
}

function allDelete(): void {
  fetch(firebaseUrl, { method: "DELETE" }).then((res) => {
    console.log(res.statusText)
    fetchData(firebaseUrl)
  })
}

function post2fireBase(url: string, data: object): void {
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    console.log(res.statusText)
  })

  // TODO: この関数内でデータの取得するの気持ち悪いから後で外に出す(ここはあくまでpostだけにしたいよね)
  fetchData(url)
}

// TODO: 後で分割する(この中でhtmlまで生成しているの気持ち悪いから)
function fetchData(url: string) {
  fetch(url)
    .then((re) => re.json())
    .then((res) => {
      let tbody = ""
      for (let k in res) {
        
        let item = res[k]
        // TODO ここitemのプロパティはEnumにできそう。たぶんPOSTしたときのキー名と一致してるはず
        tbody =
          ` <tr>
                    <td> ${item["message"]}</td>
                    <td> ${item["nickname"]}</td>
                    <td> ${new Date(item["posted"]).toLocaleString()}</td>
                  </tr>
        ` + tbody
      }

      tBody.innerHTML = "" // 既存分を一旦クリア
      tBody.innerHTML = tbody
    })
}

window.addEventListener("load", () => {
  message = document.querySelector("#message")
  nickname = document.querySelector("#nickname")
  tBody = document.querySelector("#table tbody")

  const sendBtn: HTMLButtonElement = document.querySelector("#send-btn")
  sendBtn.onclick = send

  const delBtn: HTMLButtonElement = document.querySelector("#all-delete-btn")
  delBtn.onclick = allDelete

  fetchData(firebaseUrl)
})
