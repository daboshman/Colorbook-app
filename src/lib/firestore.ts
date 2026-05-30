import {
  collection,
  query,
  where,
  limit,
  getDocs,
  doc,
  getDoc,
  orderBy,
} from 'firebase/firestore'
import { db } from './firebase'
import type { ColoringPage } from '../types'

const COLLECTION = 'coloringPages'

export async function searchColoringPages(searchQuery: string): Promise<ColoringPage[]> {
  const queryLower = searchQuery.trim().toLowerCase()
  if (!queryLower) return []

  const q = query(
    collection(db, COLLECTION),
    where('keywords', 'array-contains', queryLower),
    orderBy('created_at', 'desc'),
    limit(24),
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as ColoringPage)
}

export async function getColoringPageById(id: string): Promise<ColoringPage | null> {
  const ref = doc(db, COLLECTION, id)
  const snapshot = await getDoc(ref)
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() } as ColoringPage
}
