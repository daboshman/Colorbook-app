import { Timestamp } from 'firebase/firestore'

// Firestore schema (kept for future features like favorites/uploads)
export interface ColoringPage {
  id: string
  title: string
  keywords: string[]
  thumbnail_url: string
  full_image_url: string
  source_license: string
  a4_aspect_ratio: boolean
  created_at: Timestamp
}

// Universal search result used by the UI
export interface SearchItem {
  id: string
  title: string
  thumbnail_url: string
  full_image_url: string
  source_license: string
}
