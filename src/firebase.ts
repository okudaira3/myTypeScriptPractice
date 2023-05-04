export async function allDelete(firebaseUrl) {
  const response = await fetch(firebaseUrl, { method: "DELETE" })
  if (!response.ok) {
    throw new Error(`Failed to fetch ${firebaseUrl}: ${response.status} ${response.statusText}`)
  }
}

export async function post2fireBase(url: string, data: object) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }
}

export async function fetchData(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }
  return await response.json()
}
