const Helper = require("../helper");
const Follow = require("../model/follow");

const followQueries = {
  follows: async () => {
    try {
      const follows = await Follow.findAll();
      return follows;
    } catch (error) {
      throw error;
    }
  },

  follow: async (_, { id }) => {
    try {
      const follow = await Follow.findOne(id);
      return follow;
    } catch (error) {
      throw error;
    }
  },

  followWithUsers: async () => {
    try {
      const follow = await Follow.followWithUsers();
      return follow;
    } catch (error) {
      throw error;
    }
  },
};

const followMutations = {
  createFollow: async (_, { payload }, context) => {
    const loggedUser = await context.tokenGuard();
    payload.followerId = loggedUser.id;
    try {
      const newFollow = await Follow.createFollow(payload);
      return newFollow;
    } catch (error) {
      throw error;
    }
  },
};

const followResolvers = {
  Query: followQueries,
  Mutation: followMutations,
};

module.exports = followResolvers;
