const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const Helper = require("../helper");

module.exports = class Follow {
  static collection() {
    return getDatabase().collection("follows");
  }

  static async findAll() {
    try {
      return await this.collection().find().sort({ createdAt: -1 }).toArray();
    } catch (error) {
      throw error;
    }
  }

  static async findOne(id) {
    try {
      return await this.collection().findOne({
        _id: new ObjectId(id),
      });
    } catch (error) {
      throw error;
    }
  }
  //  # feature follow OK
  static async createFollow(payload) {
    try {
      payload.createdAt = new Date();
      payload.updatedAt = new Date();
      payload.followingId = new ObjectId(payload.followingId);
      if (payload.followingId.toString() === payload.followerId.toString()) {
        Helper.error("You cannot follow yourself", 400); // validation email format OK
      }
      const follow = await this.collection().insertOne(payload);
      return await this.findOne(follow.insertedId);
    } catch (error) {
      throw error;
    }
  }
  // # feature show follow users
  static async followWithUsers() {
    try {
      return await this.collection()
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "followingId",
              foreignField: "_id",
              as: "following",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "followerId",
              foreignField: "_id",
              as: "follower",
            },
          },
        ])
        .toArray();
    } catch (error) {
      throw error;
    }
  }
};
