import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PostCard from "../components/PostCard";

import { fetchPostDetails } from "../services/postsService";
import { useBookmarkStore } from "../store/bookmarkStore";
import type { Post } from "../types/post";

export default function Bookmarks() {
  const bookmarkIds = useBookmarkStore((state) => state.bookmarks);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (bookmarkIds.length === 0) {
      setBookmarkedPosts([]);
      setError("");
      return;
    }

    let isMounted = true;

    async function loadBookmarkedPosts() {
      try {
        setLoading(true);
        setError("");

        const posts = await Promise.all(
          bookmarkIds.map(async (id) => {
            const response = await fetchPostDetails(id);
            return response.post;
          })
        );

        if (isMounted) {
          setBookmarkedPosts(posts);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load bookmarked posts.");
          setBookmarkedPosts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadBookmarkedPosts();

    return () => {
      isMounted = false;
    };
  }, [bookmarkIds]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading bookmarked posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Unable to load bookmarks</h2>
        <p className="mt-3 text-gray-500">Please try again in a moment.</p>
      </div>
    );
  }

  if (bookmarkIds.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">No Bookmarks Yet ⭐</h2>

        <p className="mt-3 text-gray-500">
          Bookmark your favourite posts to find them here.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-slate-600 px-5 py-2 text-white"
        >
          Browse Posts
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Bookmarks</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookmarkedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}