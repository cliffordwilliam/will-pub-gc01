const Helper = require("../helper");
const User = require("../model/user");

const userQueries = {
  users: async () => {
    // const loggedUser = await context.tokenGuard();
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  },

  user: async (_, { id }) => {
    // const loggedUser = await context.tokenGuard();
    try {
      const user = await User.findOne(id);
      return user;
    } catch (error) {
      throw error;
    }
  },
  //  # feature name / username search OK
  searchUsers: async (_, { query }) => {
    // const loggedUser = await context.tokenGuard();
    try {
      const users = await User.findByUsernameOrName(query);
      return users;
    } catch (error) {
      throw error;
    }
  },
};

const userMutations = {
  //  # feature register OK
  register: async (_, { payload }) => {
    // const loggedUser = await context.tokenGuard();
    try {
      const newUser = await User.register(payload);
      return newUser;
    } catch (error) {
      throw error;
    }
  },
  //  # feature login OK
  login: async (_, { payload }) => {
    // const loggedUser = await context.tokenGuard();
    try {
      const { user, token } = await User.login(payload);
      return { user, token };
    } catch (error) {
      throw error;
    }
  },
};

const userResolvers = {
  Query: userQueries,
  Mutation: userMutations,
};

module.exports = userResolvers;
