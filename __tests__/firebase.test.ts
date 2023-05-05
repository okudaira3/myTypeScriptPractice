import { FireBase } from "../src/firebase"

describe("FireBase", () => {
  let firebase: FireBase
  const testData = {
    nickname: "test",
    message: "test-message",
    posted: new Date().getTime(),
  }

  beforeEach(() => {
    firebase = new FireBase("https://firsttypescriptapp-default-rtdb.asia-southeast1.firebasedatabase.app/boards.json")
  })

  afterEach(() => {
    // 消しちゃうとpostのテストでpost後のデータも消えたのでコメントアウトしちゃうよ
    //  firebase.allDelete()
  })

  describe("constructor", () => {
    test("正常系", () => {
      expect(firebase.firebaseUrl).toBe(
        "https://firsttypescriptapp-default-rtdb.asia-southeast1.firebasedatabase.app/boards.json"
      )
    })

    test("異常系1；URLが空文字", () => {
      expect(() => new FireBase("")).toThrow(Error)
    })

    test("異常系2；URLの先頭がhttps以外", () => {
      expect(() => new FireBase("http://")).toThrow(Error)
    })

    test("異常系3；URLの末尾がjson以外", () => {
      expect(() => new FireBase("https://hogehoge.co.jp/html")).toThrow(Error)
    })
  })

  describe("post", () => {
    test("正常系", async () => {
      await firebase.allDelete()
      await firebase.post(testData)
      const messages = await firebase.fetchData()

      expect(messages).toMatchObject({ [Object.keys(messages)[0]]: testData })
    })
  })

  describe("fetch", () => {
    test("正常系", async () => {
      // // fetchで取得するデータを事前に登録
      await firebase.allDelete()
      await firebase.post(testData)
      const messages = await firebase.fetchData()

      expect(messages).toMatchObject({ [Object.keys(messages)[0]]: testData })
    })
  })

  describe("allDelete", () => {
    test("allDelete", async () => {
      // Deleteするデータを事前に登録
      const data = {
        nickname: "test",
        message: "test-message",
        posted: new Date().getTime(),
      }

      // 登録 → 削除 → fetch で件数が0ならOK
      await firebase.post(data)
      await firebase.allDelete()
      const messages = await firebase.fetchData()

      expect(messages).toBe(null)
    })
  })
})
