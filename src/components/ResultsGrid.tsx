import { ResultCard } from './ResultCard'
import type { SearchItem } from '../types'

interface ResultsGridProps {
  pages: SearchItem[]
}

export function ResultsGrid({ pages }: ResultsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {pages.map((page) => (
        <ResultCard key={page.id} page={page} />
      ))}
    </div>
  )
}
