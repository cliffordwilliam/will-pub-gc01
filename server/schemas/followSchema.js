module.exports = followTypedef = `#graphql
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  type FollowUserOutput {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
    following: [User]
    follower: [User]
  }

  type Query {
    follows: [Follow]
    follow(id: ID!): Follow
    followWithUsers: [FollowUserOutput]
  }

  type Mutation {
    createFollow(payload: FollowInput): Follow # feature follow OK
  }

  input FollowInput {
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }
`;
