const API_URL = 'https://google.serper.dev/images'

export interface SerperImage {
  title: string
  imageUrl: string
  thumbnailUrl: string
  source: string
}

interface SerperResponse {
  images: SerperImage[]
}

export async function searchSerper(query: string, page = 1): Promise<SerperImage[]> {
  const key = import.meta.env.VITE_SERPER_API_KEY

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'X-API-KEY': key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: `${query} coloring page`,
      num: 100,
      page,
    }),
  })

  if (!res.ok) throw new Error('Search failed')
  const data: SerperResponse = await res.json()
  return data.images ?? []
}
