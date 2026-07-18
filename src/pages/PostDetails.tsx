import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import PostMeta from "../components/PostMeta";
import CommentList from "../components/CommentList";

import { fetchPostDetails } from "../services/postsService";

import { type Comment,type Post } from "../types/post";

export default function PostDetails() {
 const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function loadPost() {
    if (!id) return;

    try {
      setLoading(true);

      setError("");
const postId = Number(id);

      const response = await fetchPostDetails(postId);

      setPost(response.post);

      setComments(response.comments);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch post."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPost();
  }, [id]);

  if (loading) return <Loader />;

  if (error)
    return (
      <ErrorMessage
        message={error}
        onRetry={loadPost}
      />
    );

  if (!post)
    return (
      <div className="text-center py-20">
        Post not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline"
      >
        ← Back
      </button>

      {/* Post */}

      <article className="rounded-xl border p-8 shadow-sm">

        <h1 className="text-3xl font-bold">
          {post.title}
        </h1>

        <PostMeta post={post} />

        <p className="mt-8 leading-8 text-gray-700 whitespace-pre-line">
          {post.body}
        </p>

      </article>

      {/* Comments */}

      <section>

        <h2 className="text-2xl font-semibold mb-6">
          Comments ({comments.length})
        </h2>

        <CommentList comments={comments} />

      </section>

    </div>
  );
}