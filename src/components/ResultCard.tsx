import { useNavigate, useSearchParams } from 'react-router-dom'
import type { SearchItem } from '../types'

interface ResultCardProps {
  page: SearchItem
}

export function ResultCard({ page }: ResultCardProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''

  function handleClick() {
    const params = new URLSearchParams({
      url: page.full_image_url,
      title: page.title,
      ...(q ? { q } : {}),
    })
    navigate(`/print?${params}`)
  }

  return (
    <button
      onClick={handleClick}
      className="group flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left w-full"
      aria-label={`Open ${page.title}`}
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={page.thumbnail_url}
          alt={page.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug capitalize">
          {page.title}
        </p>
        <p className="mt-1 text-xs text-gray-400 uppercase tracking-wide">{page.source_license}</p>
      </div>
    </button>
  )
}
