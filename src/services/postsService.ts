import { api } from "./api";

import {
  type  FetchPostsParams,
   type PostDetailsResponse,
   type PostsResponse,
   type CommentsResponse,
   type Post
} from "../types/post";

export async function fetchPosts({
    page,
    limit,
    search = "",
}: FetchPostsParams): Promise<PostsResponse> {

    if (search.trim()) {

        return api<PostsResponse>(
            `/posts/search?q=${encodeURIComponent(search)}`
        );

    }

    const skip = (page - 1) * limit;

    return api<PostsResponse>(
        `/posts?limit=${limit}&skip=${skip}`
    );

}


export async function fetchPostDetails(
  id: number
): Promise<PostDetailsResponse> {
  const [post, comments] = await Promise.all([
    api<Post>(`/posts/${id}`),
    api<CommentsResponse>(`/posts/${id}/comments`),
  ]);

  return {
    post,
    comments: comments.comments,
  };
}