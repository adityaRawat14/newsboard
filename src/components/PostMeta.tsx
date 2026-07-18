import {type Post } from "../types/post";

interface Props {
  post: Post;
}

export default function PostMeta({
  post,
}: Props) {
  return (
    <>
      <div className="flex flex-wrap gap-2 mt-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600">
        <span>👍 {post.reactions.likes}</span>

        <span>👎 {post.reactions.dislikes}</span>

        <span>👁 {post.views}</span>
      </div>
    </>
  );
}