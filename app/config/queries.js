import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($payload: LoginInput) {
    login(payload: $payload) {
      user {
        _id
        name
        username
        email
        password
      }
      token
    }
  }
`;

export const POSTS = gql`
  query Posts {
    posts {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const POST = gql`
  query Post($postId: ID!) {
    post(id: $postId) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const SEARCH_USERS = gql`
  query SearchUsers($query: String!) {
    searchUsers(query: $query) {
      _id
      name
      username
      email
      password
    }
  }
`;

export const USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      _id
      name
      username
      email
      password
      following {
        _id
        name
        username
        email
        password
      }
      follower {
        _id
        name
        username
        email
        password
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($payload: createPostInput) {
    createPost(payload: $payload) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_FOLLOW = gql`
  mutation CreateFollow($payload: FollowInput) {
    createFollow(payload: $payload) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_LIKE = gql`
  mutation UpdatePostLike($updatePostLikeId: ID, $payload: LikeInput) {
    updatePostLike(id: $updatePostLikeId, payload: $payload) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation UpdatePostComment($payload: CommentInput, $updatePostCommentId: ID) {
    updatePostComment(payload: $payload, id: $updatePostCommentId) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const REGISTER = gql`
  mutation Register($payload: RegisterInput) {
    register(payload: $payload) {
      _id
      name
      username
      email
      password
    }
  }
`;
