const BASE_URL = 'https://api.openverse.org/v1/images/'

export interface OpenverseResult {
  id: string
  title: string
  thumbnail: string
  url: string
  license: string
}

interface OpenverseResponse {
  results: OpenverseResult[]
}

export async function searchOpenverse(query: string): Promise<OpenverseResult[]> {
  const params = new URLSearchParams({
    q: query,
    page_size: '24',
  })

  const res = await fetch(`${BASE_URL}?${params}`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`Search failed: ${res.status}`)
  const data: OpenverseResponse = await res.json()
  return data.results
}
