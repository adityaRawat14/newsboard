import { type Comment } from "../types/post";
import CommentCard from "./CommentCard";

interface Props {
  comments: Comment[];
}

export default function CommentList({
  comments,
}: Props) {
  if (comments.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-zinc-500">
          No comments yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
}