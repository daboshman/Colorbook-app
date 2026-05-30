import { useState, useEffect } from 'react'
import { searchPixabay } from '../lib/pixabay'
import type { SearchItem } from '../types'

interface UseSearchReturn {
  results: SearchItem[]
  loading: boolean
  error: string | null
}

export function useSearch(query: string): UseSearchReturn {
  const [results, setResults] = useState<SearchItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    let cancelled = false

    async function run() {
      setLoading(true)
      setError(null)
      try {
        const hits = await searchPixabay(query)
        if (!cancelled) {
          setResults(
            hits.map((h) => ({
              id: String(h.id),
              title: h.tags.split(',')[0].trim(),
              thumbnail_url: h.webformatURL,
              full_image_url: h.largeImageURL,
              source_license: 'Pixabay License',
            })),
          )
        }
      } catch {
        if (!cancelled) setError('Something went wrong. Please try again.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()
    return () => { cancelled = true }
  }, [query])

  return { results, loading, error }
}
