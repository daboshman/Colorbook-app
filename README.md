# Coloring Page Finder

A React web app for searching and printing free printable coloring pages, powered by Firebase.

## Tech Stack

- React 18 + Vite + TypeScript
- Tailwind CSS v3
- Firebase v9 (Auth, Firestore, Storage)
- React Router v6

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in your Firebase project values in `.env`:

| Variable | Value |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `<project-id>.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | `<project-id>.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

### 3. Deploy Firebase rules

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules,storage,firestore:indexes
```

### 4. Seed Firestore data

Add documents to the `coloringPages` collection with this shape:

```ts
{
  title: "Unicorn with Stars",
  keywords: ["unicorn", "stars", "fantasy", "magical"],  // lowercase
  thumbnail_url: "https://...",
  full_image_url: "https://...",
  source_license: "CC0",
  a4_aspect_ratio: true,
  created_at: Timestamp.now()
}
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |

## Firestore Index Required

The search query uses a composite index. Deploy it with:

```bash
firebase deploy --only firestore:indexes
```

The index is defined in `firestore.indexes.json`:
- Collection: `coloringPages`
- Fields: `keywords` (array-contains) + `created_at` (descending)

## Deploy to Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

## Project Structure

```
src/
├── components/    UI components (Layout, SearchBar, ResultCard, etc.)
├── hooks/         useAuth, useSearch
├── lib/           Firebase init, Firestore queries, Auth helpers
├── pages/         HomePage, SearchResultsPage, PrintPage
└── types/         TypeScript interfaces
```
