interface printable {
  print(): void
}

interface stringable {
  getString(): string
}

export type Person = {
  name: string
  age: number
}

export class MyData implements printable, stringable {
  people: Person[] = []
  constructor() {}

  add(n: string, a: number): void {
    this.people.push({ name: n, age: a })
  }

  print(): void {
    console.log(`*** mydata ${this.getString()}`)
  }

  getString(): string {
    let res = `[`
    for (let item of this.people) {
      res += `${item.name}です、${item.age}だよ
        `
    }
    res += `]`
    return res
  }
}
