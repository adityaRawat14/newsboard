import { type Comment } from "../types/post";

interface Props {
  comment: Comment;
}

export default function CommentCard({
  comment,
}: Props) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-zinc-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-zinc-900
        hover:shadow-lg
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold tracking-tight text-zinc-900">
            {comment.user.fullName}
          </h3>

          <p className="text-sm text-zinc-500">
            @{comment.user.username}
          </p>
        </div>

        <span
          className="
            rounded-lg
            bg-zinc-100
            px-3
            py-1.5
            text-sm
            font-semibold
            text-zinc-700
          "
        >
          👍 {comment.likes}
        </span>
      </div>

      {/* Comment */}
      <p className="mt-4 leading-7 text-zinc-700">
        {comment.body}
      </p>
    </div>
  );
}