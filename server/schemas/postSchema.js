module.exports = postTypedef = `#graphql
  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
  }

  type Query {
    posts: [Post] # feature show post from latest OK
    post(id: ID!): Post
    likes(id: ID!): Int # feature show total likes OK
  }

  type Mutation {
    createPost(payload: createPostInput): Post # feature add post OK
    updatePostComment(id: ID, payload: CommentInput): Post # feature comment post OK (ID FROM COMPASS)
    updatePostLike(id: ID, payload: LikeInput): Post # feature like post OK
  }

  input createPostInput {
    content: String! # req OK
    tags: [String]
    imgUrl: String
    authorId: ID!  # req OK
    comments: [CommentInput]
    likes: [LikeInput]
    createdAt: String
    updatedAt: String
  }
  
  type Like {
    username: String
    createdAt: String
    updatedAt: String
  }

  input LikeInput {
    username: String
    createdAt: String
    updatedAt: String
  }

  type Comment {
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }

  input CommentInput {
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }
`;
