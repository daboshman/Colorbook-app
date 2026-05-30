const BASE_URL = 'https://pixabay.com/api/'

export interface PixabayHit {
  id: number
  tags: string
  webformatURL: string
  largeImageURL: string
}

interface PixabayResponse {
  hits: PixabayHit[]
}

export async function searchPixabay(query: string): Promise<PixabayHit[]> {
  const key = import.meta.env.VITE_PIXABAY_API_KEY
  const params = new URLSearchParams({
    key,
    q: query,
    image_type: 'illustration',
    safesearch: 'true',
    per_page: '24',
  })

  const res = await fetch(`${BASE_URL}?${params}`)
  if (!res.ok) throw new Error('Search failed')
  const data: PixabayResponse = await res.json()
  return data.hits
}
