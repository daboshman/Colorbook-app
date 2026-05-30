interface PrintPreviewProps {
  imageUrl: string
  title: string
}

export function PrintPreview({ imageUrl, title }: PrintPreviewProps) {
  return (
    <div className="flex justify-center">
      {/* A4 proportions: 794px × 1123px */}
      <div
        id="print-area"
        className="relative bg-white shadow-lg"
        style={{ width: '794px', height: '1123px', maxWidth: '100%' }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  )
}
