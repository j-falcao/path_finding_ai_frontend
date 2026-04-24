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

export async function runDefaultMapSearch(data) {

  const response = await fetch("http://127.0.0.1:8000/api/defaultMapSearch", {
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

export async function license_plate(data) {
  const response = await fetch("http://127.0.0.1:8000/api/ocr/license-plate", {
    method: "POST",
    body: data
  })
  if (!response.ok) throw new Error("Login failed")
  return response.json()
}


export async function getAttractions(city) {
  const response = await fetch(`http://127.0.0.1:8000/llm/city-info?city=${encodeURIComponent(city)}`)
  if (!response.ok) throw new Error('Failed to fetch city attractions')
  const data = await response.json()

  // The Ollama response wraps the JSON string inside data.response
  // Parse it out safely
  try {
    const raw = typeof data.response === 'string' ? data.response : JSON.stringify(data)
    console.log('raw', raw)
    // Strip markdown fences if the model wrapped output in ```json ... ```
    const cleaned = raw.replace(/```json|```/gi, '').trim()
    const parsed = JSON.parse(cleaned)
    // Support both { attractions: [...] } and a bare array
    return Array.isArray(parsed) ? parsed : parsed.attractions ?? []
  } catch {
    console.error('Could not parse city-info response', data)
    return []
  }
}
