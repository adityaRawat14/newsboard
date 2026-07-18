import type { MouseEvent } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import { type Post } from "../types/post";

import { useBookmarkStore } from "../store/bookmarkStore";

interface Props {
  post: Post;
}

export default function BookmarkButton({
  post,
}: Props) {
    
const toggleBookmark = useBookmarkStore(
  (state) => state.toggleBookmark
);

const bookmarks = useBookmarkStore(
    state => state.bookmarks
);

const bookmarked =
    bookmarks.includes(post.id);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    toggleBookmark(post.id);
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-full p-2 transition hover:bg-gray-100"
    >
      {bookmarked ? (
        <FaBookmark className="text-amber-500" size={18} />
      ) : (
        <FaRegBookmark className="text-gray-500" size={18} />
      )}
    </button>
  );
}