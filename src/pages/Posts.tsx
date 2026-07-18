import { useEffect, useMemo, useState } from "react";

import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import SortDropdown, {
  type SortOption,
} from "../components/SortDropdown";

import useDebounce from "../hooks/useDebounce";

import { fetchPosts } from "../services/postsService";

import type { Post } from "../types/post";
import { useBookmarkStore } from "../store/bookmarkStore";

const POSTS_PER_PAGE = 10;

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [sort, setSort] =
    useState<SortOption>("default");

  const currentPage = useBookmarkStore(
    (state) => state.currentPage
  );

  const setCurrentPage = useBookmarkStore(
    (state) => state.setCurrentPage
  );

  async function loadPosts() {
    try {
      setLoading(true);
      setError("");

      const response = await fetchPosts({
        page: currentPage,
        limit: POSTS_PER_PAGE,
        search: debouncedSearch,
      });

      setPosts(response.posts);
      setTotalPosts(response.total);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to fetch posts."
      );
    } finally {
      setLoading(false);
    }
  }
const previousPage = useBookmarkStore(
  state => state.previousPage
);

const setPreviousPage = useBookmarkStore(
  state => state.setPreviousPage
);
  useEffect(() => {
    void loadPosts();
  }, [currentPage, debouncedSearch]);

  const sortedPosts = useMemo(() => {
    const data = [...posts];

    switch (sort) {
      case "title-asc":
        return data.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

      case "title-desc":
        return data.sort((a, b) =>
          b.title.localeCompare(a.title)
        );

      case "likes-asc":
        return data.sort(
          (a, b) =>
            a.reactions.likes -
            b.reactions.likes
        );

      case "likes-desc":
        return data.sort(
          (a, b) =>
            b.reactions.likes -
            a.reactions.likes
        );

      default:
        return data;
    }
  }, [posts, sort]);

  const totalPages = Math.ceil(
    totalPosts / POSTS_PER_PAGE
  );

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
       <SearchBar
  value={search}
  onChange={(value) => {
    // Save current page only when search starts
    if (!search && value) {
      setPreviousPage(currentPage);
    }

    setSearch(value);
    setCurrentPage(1);
  }}
  onClear={() => {
    setSearch("");
    setCurrentPage(previousPage);
  }}
/>

        <SortDropdown
          value={sort}
          onChange={setSort}
        />
      </div>

      {/* Loading */}

      {loading && <Loader />}

      {/* Error */}

      {!loading && error && (
        <ErrorMessage
          message={error}
          onRetry={loadPosts}
        />
      )}

      {/* Posts */}

      {!loading && !error && (
        <>
          {sortedPosts.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              No posts found.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}