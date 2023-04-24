let table: HTMLTableElement
let message: HTMLInputElement

const strageKey = "memo_data"

type Memo = {
  message: string
  date: Date
}

class MemoData {
  data: Memo[] = []

  add(memo: Memo): void {
    this.data.unshift(memo)
  }

  save(): void {
    localStorage.setItem(strageKey, JSON.stringify(this.data))
  }

  load(): void {
    const readed = JSON.parse(localStorage.getItem(strageKey))
    this.data = readed ? readed : []
  }

  getHtml(): string {
    let html = "<thead><th>memo</th><th>date</th></thead><tbody>"
    for (let item of this.data) {
      html += "<tr><td>" + item.message + "</td><td>" + item.date.toLocaleString() + "</td></tr>"
    }
    return html + "</tbody>"
  }
}

const memo = new MemoData()

function showTable(html: string) {
  table.innerHTML = html
}

// もとの名前は doAction
function save() {
  const msg = message.value.toString()
  memo.add({ message: msg, date: new Date() })
  memo.save()
  memo.load()
  showTable(memo.getHtml())
}

// もとの名前は doInitial
function initial() {
  memo.data = []
  memo.save()
  memo.load()
  message.value = ""
  showTable(memo.getHtml())
}

window.addEventListener("load", () => {
  table = document.querySelector("#table")
  message = document.querySelector("#message")
  document.querySelector("#save-btn").addEventListener("click", save)
  document.querySelector("#initial-btn").addEventListener("click", initial)
  memo.load()
  showTable(memo.getHtml())
})
