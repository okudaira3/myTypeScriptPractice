export class FireBase {
  readonly firebaseUrl: string

  constructor(firebaseUrl: string) {
    if (!firebaseUrl || !firebaseUrl.startsWith("https://") || !firebaseUrl.endsWith("json")) {
      throw new Error(`FirebaseのURLに不正な値${firebaseUrl}が指定されました`)
    }

    this.firebaseUrl = firebaseUrl
  }

  public async allDelete() {
    const response = await fetch(this.firebaseUrl, { method: "DELETE" })
    if (!response.ok) {
      throw new Error(`Failed to fetch ${this.firebaseUrl}: ${response.status} ${response.statusText}`)
    }
  }

  public async post2fireBase(data: object) {
    const response = await fetch(this.firebaseUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch ${this.firebaseUrl}: ${response.status} ${response.statusText}`)
    }
  }

  public async fetchData() {
    const response = await fetch(this.firebaseUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${this.firebaseUrl}: ${response.status} ${response.statusText}`)
    }
    return await response.json()
  }
}
