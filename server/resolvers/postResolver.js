const Helper = require("../helper");
const Post = require("../model/post");

const postQueries = {
  posts: async () => {
    try {
      const posts = await Post.findAll();
      return posts;
    } catch (error) {
      throw error;
    }
  },

  post: async (_, { id }) => {
    try {
      const post = await Post.findOne(id);
      return post;
    } catch (error) {
      throw error;
    }
  },

  likes: async (_, { id }, context) => {
    const loggedUser = await context.tokenGuard();
    try {
      const post = await Post.findOne(id);
      return post.likes.length;
    } catch (error) {
      throw error;
    }
  },
};

const postMutations = {
  createPost: async (_, { payload }, context) => {
    const loggedUser = await context.tokenGuard();
    payload.authorId = loggedUser.id;
    try {
      const newPost = await Post.createPost(payload);
      return newPost;
    } catch (error) {
      throw error;
    }
  },

  updatePostComment: async (_, { id, payload }, context) => {
    const loggedUser = await context.tokenGuard();
    payload.username = loggedUser.username;
    try {
      const updatedPost = await Post.updatePostComment(id, payload);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  },

  updatePostLike: async (_, { id, payload }, context) => {
    const loggedUser = await context.tokenGuard();
    payload.username = loggedUser.username;
    try {
      const updatedPost = await Post.updatePostLike(id, payload);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  },
};

const postResolvers = {
  Query: postQueries,
  Mutation: postMutations,
};

module.exports = postResolvers;
