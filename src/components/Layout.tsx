import { Link } from 'react-router-dom'
import { AuthButton } from './AuthButton'
import { SearchBar } from './SearchBar'
import { useLocation } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <Link
            to="/"
            className="shrink-0 text-lg font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            ColorFinder
          </Link>

          {!isHome && (
            <div className="flex-1 max-w-xl">
              <SearchBar />
            </div>
          )}

          <div className="ml-auto shrink-0">
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-400">
        Free printable coloring pages — CC0 &amp; Public Domain
      </footer>
    </div>
  )
}
