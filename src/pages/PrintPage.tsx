import { useSearchParams, useNavigate } from 'react-router-dom'
import { PrintPreview } from '../components/PrintPreview'

export function PrintPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const imageUrl = params.get('url')
  const title = params.get('title') ?? 'Coloring Page'
  const q = params.get('q')

  function handleBack() {
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`)
    } else {
      navigate(-1)
    }
  }

  if (!imageUrl) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-lg font-semibold text-gray-700">No image found.</p>
        <button
          onClick={handleBack}
          className="mt-6 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          Back to results
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 print:p-0 print:m-0 print:max-w-none">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold text-gray-900 capitalize">{title}</h1>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print / Download
        </button>
      </div>

      <PrintPreview imageUrl={imageUrl} title={title} />
    </div>
  )
}
