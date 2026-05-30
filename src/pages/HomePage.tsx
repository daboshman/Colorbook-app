import { SearchBar } from '../components/SearchBar'

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 sm:py-32">
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
        Coloring Page Finder
      </h1>
      <p className="mb-10 text-center text-lg text-gray-500">
        Search thousands of free printable coloring pages
      </p>
      <div className="w-full max-w-xl">
        <SearchBar size="large" />
      </div>
      <p className="mt-6 text-sm text-gray-400">
        Try: <span className="italic">unicorn, dragon, mandala, dinosaur</span>
      </p>
    </div>
  )
}
