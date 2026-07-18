export interface Reaction {
    likes: number;
    dislikes: number;
}

export interface Post {

    id:number;

    title:string;

    body:string;

    tags:string[];

    reactions:Reaction;

    views:number;

    userId:number;

}

export interface PostsResponse{

    posts:Post[];

    total:number;

    skip:number;

    limit:number;

}

export interface FetchPostsParams {
    page: number;
    limit: number;
    search?: string;
}

export interface CommentUser {
  id: number;
  username: string;
  fullName: string;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: CommentUser;
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

export interface PostDetailsResponse {
  post: Post;
  comments: Comment[];
}