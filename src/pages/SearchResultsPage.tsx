import { useSearchParams } from 'react-router-dom'
import { useSearch } from '../hooks/useSearch'
import { ResultsGrid } from '../components/ResultsGrid'

export function SearchResultsPage() {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  const { results, loading, loadingMore, error, hasMore, loadMore } = useSearch(query)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="mb-6 text-sm text-gray-500">
        {loading
          ? 'Searching…'
          : error
          ? ''
          : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
      </p>

      {loading && (
        <div className="flex justify-center py-20">
          <svg
            className="h-10 w-10 animate-spin text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Loading"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && results.length === 0 && query && (
        <div className="py-20 text-center">
          <p className="text-xl font-semibold text-gray-700">No results for "{query}"</p>
          <p className="mt-2 text-gray-400">Try a different keyword</p>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <ResultsGrid pages={results} />

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 transition-colors"
              >
                {loadingMore ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading…
                  </>
                ) : (
                  'Load more'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
