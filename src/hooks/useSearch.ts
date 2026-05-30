import { useState, useEffect } from 'react'
import { searchSerper } from '../lib/serper'
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
        const hits = await searchSerper(query)
        if (!cancelled) {
          setResults(
            hits.map((h, i) => ({
              id: `${i}-${h.imageUrl}`,
              title: h.title,
              thumbnail_url: h.thumbnailUrl,
              full_image_url: h.imageUrl,
              source_license: h.source,
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
