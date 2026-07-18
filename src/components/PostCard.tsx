import { Link } from "react-router-dom";

import type { Post } from "../types/post";
import BookmarkButton from "./BookmarkButton";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-zinc-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-zinc-900
        hover:shadow-2xl
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <Link to={`/posts/${post.id}`} className="min-w-0">
          <h2
            className="
              line-clamp-2
              text-xl
              font-bold
              tracking-tight
              text-zinc-900
              transition-colors
              duration-200
              group-hover:text-black
            "
          >
            {post.title}
          </h2>
        </Link>

        <BookmarkButton post={post} />
      </div>

      {/* Body */}
      <Link to={`/posts/${post.id}`} className="mt-4 block">
        <p className="line-clamp-3 text-[15px] leading-7 text-zinc-600">
          {post.body}
        </p>
      </Link>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="
              rounded-full
              border
              border-zinc-200
              bg-zinc-100
              px-3
              py-1
              text-xs
              font-semibold
              text-zinc-700
              transition
              group-hover:bg-zinc-200
            "
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-5">
        <div className="flex items-center gap-3">
          <span
            className="
              rounded-lg
              bg-zinc-100
              px-3
              py-2
              text-sm
              font-semibold
              text-zinc-700
            "
          >
            👍 {post.reactions.likes}
          </span>

          <span
            className="
              rounded-lg
              bg-zinc-100
              px-3
              py-2
              text-sm
              font-semibold
              text-zinc-700
            "
          >
            👁 {post.views}
          </span>
        </div>

        <Link
          to={`/posts/${post.id}`}
          className="
            rounded-xl
            bg-zinc-900
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-black
            hover:shadow-lg
          "
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}