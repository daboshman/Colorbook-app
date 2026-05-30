import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  initialValue?: string
  size?: 'default' | 'large'
}

export function SearchBar({ initialValue = '', size = 'default' }: SearchBarProps) {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const isLarge = size === 'large'

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search coloring pages…"
        className={`flex-1 rounded-full border border-gray-300 bg-white shadow-sm outline-none transition-shadow focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
          isLarge ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm'
        }`}
        aria-label="Search coloring pages"
      />
      <button
        type="submit"
        className={`rounded-full bg-indigo-600 font-medium text-white shadow-sm hover:bg-indigo-700 active:bg-indigo-800 transition-colors ${
          isLarge ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
        }`}
      >
        Search
      </button>
    </form>
  )
}
