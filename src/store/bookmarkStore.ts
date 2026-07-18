import { create } from "zustand";

interface BookmarkState {
  bookmarks: number[];

  currentPage: number;
  previousPage: number;
  setPreviousPage: (page: number) => void;

  toggleBookmark: (id: number) => void;

  setCurrentPage: (page: number) => void;

  clearBookmarks: () => void;
}

const STORAGE_KEY = "bookmarks";
const PAGE_KEY = "current-page";

function loadCurrentPage(): number {
  const page = localStorage.getItem(PAGE_KEY);

  return page ? Number(page) : 1;
}

function loadBookmarks(): number[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    const parsed = JSON.parse(data);

    // New format
    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === "number")
    ) {
      return parsed;
    }

    // Backward compatibility
    if (
      Array.isArray(parsed) &&
      parsed.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          typeof item.id === "number"
      )
    ) {
      return parsed.map((item) => item.id);
    }
  } catch {}

  return [];
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: loadBookmarks(),
previousPage: loadCurrentPage(),
  currentPage: loadCurrentPage(),

  toggleBookmark(id) {
    const exists = get().bookmarks.includes(id);

    const updatedBookmarks = exists
      ? get().bookmarks.filter((bookmarkId) => bookmarkId !== id)
      : [...get().bookmarks, id];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedBookmarks)
    );

    set({
      bookmarks: updatedBookmarks,
    });
  },
setPreviousPage(page) {
  set({
    previousPage: page,
  });
},
  setCurrentPage(page) {
    localStorage.setItem(
      PAGE_KEY,
      page.toString()
    );

    set({
      currentPage: page,
    });
  },

  clearBookmarks() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PAGE_KEY);

    set({
      bookmarks: [],
      currentPage: 1,
    });
  },
}));