const Helper = require("../helper");
const User = require("../model/user");

module.exports = userTypedef = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

  type UserFollowOutput {
    _id: ID
    name: String
    username: String
    email: String
    password: String
    following: [User]
    follower: [User]
  }

  type Query {
    users: [User]
    user(id: ID!): UserFollowOutput
    searchUsers(query: String!): [User] # feature name / username search OK
  }

  type Mutation {
    register(payload: RegisterInput): User # feature register OK
    login(payload: LoginInput): AuthPayload # feature login OK
  }

  input RegisterInput {
    name: String
    username: String! # req OK
    email: String! # req OK
    password: String! # req OK
  }

  input LoginInput {
    username: String
    password: String
  }

  type AuthPayload {
  user: User
  token: String
}
`;
