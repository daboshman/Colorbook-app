import { useState, useEffect, useCallback } from 'react'
import { searchSerper } from '../lib/serper'
import type { SearchItem } from '../types'

const PAGES_PER_BATCH = 3

interface UseSearchReturn {
  results: SearchItem[]
  loading: boolean
  loadingMore: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
}

function toSearchItems(hits: Awaited<ReturnType<typeof searchSerper>>, offset: number): SearchItem[] {
  return hits.map((h, i) => ({
    id: `${offset + i}-${h.imageUrl}`,
    title: h.title,
    thumbnail_url: h.thumbnailUrl,
    full_image_url: h.imageUrl,
    source_license: h.source,
  }))
}

async function fetchBatch(query: string, startPage: number): Promise<SearchItem[]> {
  const pages = Array.from({ length: PAGES_PER_BATCH }, (_, i) => startPage + i)
  const batches = await Promise.all(pages.map((p) => searchSerper(query, p)))
  return batches.flatMap((hits, i) => toSearchItems(hits, (startPage + i - 1) * 100))
}

export function useSearch(query: string): UseSearchReturn {
  const [results, setResults] = useState<SearchItem[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [nextPage, setNextPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setNextPage(1)
      setHasMore(false)
      return
    }

    let cancelled = false

    async function run() {
      setLoading(true)
      setError(null)
      try {
        const items = await fetchBatch(query, 1)
        if (!cancelled) {
          setResults(items)
          setNextPage(1 + PAGES_PER_BATCH)
          setHasMore(items.length === PAGES_PER_BATCH * 100)
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

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    try {
      const items = await fetchBatch(query, nextPage)
      setResults((prev) => [...prev, ...items])
      setNextPage((p) => p + PAGES_PER_BATCH)
      setHasMore(items.length === PAGES_PER_BATCH * 100)
    } catch {
      // silently fail — existing results stay
    } finally {
      setLoadingMore(false)
    }
  }, [query, nextPage, loadingMore, hasMore])

  return { results, loading, loadingMore, error, hasMore, loadMore }
}
