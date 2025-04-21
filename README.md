# 🎬 Next Movie - V1

Welcome to **Next Movie**, a modern movie discovery app powered by **Next.js 15 (App Router)** and **Firebase**. This project enables users to browse popular and top-rated movies, perform live search queries, and manage a personal watchlist—all with a polished, fast-reacting interface using **Zustand**, **Tailwind CSS**, and **TypeScript**.

---

## 🚀 Features

- 🔍 Live movie search with TMDb API
- 🎞️ Movie detail pages with cast and image galleries
- 🌟 Add/remove movies to/from personal watchlist
- 🔐 Firebase Authentication (email/password)
- 🧠 Optimistic updates via Zustand store
- ✅ End-to-end tests with Playwright
- ⚡ Dynamic breadcrumbs and responsive layout

---

## 🧱 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database/Backend**: Firebase Firestore + Firebase Auth
- **Testing**: Playwright
- **Icons**: Lucide React
- **Design System**: Flowbite-inspired Tailwind UI

---

## 🗂 Folder Structure

```
src/
│
├── app/                 # Next.js route-based structure
│   ├── watchlist/       # Watchlist page (client-side)
│   └── movies/[id]/     # Movie detail pages
│
├── components/          # Reusable UI components
│   ├── movies/          # MovieCard, Gallery, ActorList, AddToWatchlist
│   └── layout/          # Header, Breadcrumb, Pagination, etc.
│
├── lib/                 # Core utilities
│   ├── firebase/        # Firebase config and Firestore helpers
│   └── store.ts         # Zustand store for app state
│
├── types/               # Shared TypeScript types
├── tests/               # Playwright tests
└── public/images/       # Fallback images, logos, and static assets
```

---

## 🧪 Running Playwright Tests

To run the end-to-end tests:

```bash
# Install Playwright and its dependencies
npx playwright install

# Run all tests
npx playwright test

# Open interactive UI test runner
npx playwright test --ui
```

Tests are located in `tests/` and cover:
- Homepage rendering
- Movie detail navigation
- Search and filtering behavior
- Watchlist interactions

---

## ⚠️ Known Limitations

- **Firestore Read/Write Delays**: Due to Firebase’s free tier, there may be initial latency (cold starts) when fetching or syncing data.
- **No pagination in watchlist yet**: Only the first 50 movies are fetched on login.
- **Optimistic UI**: Watchlist updates rely on cached store state; syncing issues may occur without error handling for network failures.
- **Image blurring/loading**: Some images may appear pixelated due to poster size vs. card size. Optimization in progress.
- **Missing notifications/toasts**: No feedback for success/failure actions (e.g., watchlist sync).

---

## 📌 Future Improvements

- 🔁 Pagination and infinite scroll for watchlist and movie results
- 🔥 Switch to Supabase or Planetscale for real-time + relational DB
- 🧠 Use `react-query` or `tanstack` for data fetching and caching
- 🎨 Add toasts for UX feedback (e.g., success/error messages)
- 🌍 Multi-language support + genre filters


---

## 🧠 Developer Notes & Attention to Detail

This project was crafted with careful attention to **UX, UI polish, and developer best practices**, including:

- 🎯 **Debounced search input** using `use-debounce` to reduce unnecessary API calls and provide smooth UX while typing
- 🎨 **Smooth loading experience** powered by `react-loading-skeleton`, ensuring the UI doesn't jump or flicker during data fetches
- 🖼 **Beautiful movie gallery** with `react-image-gallery` to browse high-quality movie backdrops
- 🧭 **Dynamic breadcrumbs** powered by Zustand store state and Next Router, adjusting to search and navigation context
- 💾 **Optimistic UI updates** using Zustand: watchlist updates are immediate in the UI, while syncing to Firestore in the background
- 📦 **Modular component structure** for scalability and reusability

This level of polish is what transforms a functional app into a professional-grade user experience.




---

## ⚙️ How This Project Leverages Next.js Optimally

This project takes full advantage of **Next.js 15 features** to improve performance, structure, and developer experience:

- ⚡ **Server components** for movie detail pages to pre-render multiple API requests
- ⏱️ **Parallel data fetching** via `Promise.all()` to speed up server responses
- 📦 **Zustand client store** to handle watchlist state without prop drilling or overfetching
- 🧭 **Route grouping** and layout components for clean structure and shared UI
- 🪄 **Dynamic breadcrumbs** that update based on store and router state
- 🧱 **Incremental Static Regeneration (ISR)** potential for caching and background revalidation
- 💫 **Next.js `<Image>` optimization** for poster rendering and responsive layout
- 🧪 **Playwright testing integration** for verifying all routes and functionality
- 🌍 **Edge runtime ready** for future global performance tuning
- 🧼 **Strict server/client separation** to prevent hydration mismatch and reduce JS size

These strategies ensure the app loads fast, works great on slow connections, and scales efficiently for future features.



---

## 💡 Final Thoughts

Next Movie V1 is a polished, modern React + Firebase application built for performance and modularity. It's a great base to expand into a complete movie tracking, rating, and social sharing platform.

Built with ❤️ using Next.js 15, Tailwind, Zustand, and Firebase.

---
