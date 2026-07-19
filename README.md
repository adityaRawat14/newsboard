# React Posts Dashboard

A responsive React application that allows users to browse, search, sort, bookmark, and view post details. Built as a take-home assignment using React, TypeScript, Zustand, and Tailwind CSS.

---
## Live Demo

🌐 **Application:** https://newsboard-iota.vercel.app

---


## Features

- User Authentication (Login/Logout)
- Protected Routes
- Browse Posts
- Search Posts (Debounced)
- Sort Posts
- Pagination
- View Post Details
- View Comments
- Bookmark Posts
- Bookmark Persistence
- Responsive UI
- Error & Loading States



---

## Additional Feature


- Persistant Pagination  (no matter what page you were at after reload that page will persist on the screen)
- Responsive Components
- Sorting of blogs by Title (A->Z) or (Z->A)

 
---

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Zustand
- Tailwind CSS

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/adityaRawat14/newsboard
cd newsboard
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The application will run on:

```
http://localhost:5173
```

---

## Build

```bash
npm run build
```

---

## State Management

I used **Zustand** for global state management because the application only needs a small amount of shared state.

The store manages:

- Authentication state
- Bookmarked post IDs
- Current pagination page

Zustand was chosen over larger libraries (like react-redix) because it keeps the code simple, requires very little boilerplate, and fits well for applications of this size.

LocalStorage is used alongside Zustand to persist:
we could have used browsers local indexDB for persistant and longterm storage but this was small task so we used localstorage as of now

- Logged-in user
- Bookmarked posts
- Current page

This allows users to retain their session and bookmarks even after refreshing the page.

---

## Project Structure

```
src/
│
├── components/
├── hooks/
├── pages/
├── services/
├── store/
├── types/
└── App.tsx
```

---

## API

Data is fetched from the DummyJSON API.

- Posts
- Single Post
- Comments

---

## Notes

- Search input is debounced to reduce unnecessary API calls.
- Pagination is handled through API query parameters.
- Bookmarks are stored locally and loaded on application startup.
- The UI is fully responsive and built with Tailwind CSS.
