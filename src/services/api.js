export async function runSearch(data) {

  const response = await fetch("http://127.0.0.1:8000/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error("Search failed")
  }

  return await response.json()
}

export async function getGraph() {
  const response = await fetch("http://127.0.0.1:8000/api/graph")
  if (!response.ok) throw new Error("Failed to fetch graph")
  return response.json() // already cytoscape elements
}
