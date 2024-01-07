const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const redis = require("../redis");
const { CACHE_KEY_POSTS } = require("../c");

module.exports = class Post {
  static collection() {
    return getDatabase().collection("posts");
  }
  // # feature show post from latest OK
  static async findAll() {
    try {
      const cachedData = await redis.get(CACHE_KEY_POSTS);
      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        const newData = await this.collection()
          .find()
          .sort({ createdAt: -1 })
          .toArray();
        await redis.set(CACHE_KEY_POSTS, JSON.stringify(newData));
        return newData;
      }
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
  //  # feature add post OK
  static async createPost(payload) {
    try {
      payload.createdAt = new Date();
      payload.updatedAt = new Date();
      const post = await this.collection().insertOne(payload);
      await redis.del(CACHE_KEY_POSTS);
      return await this.findOne(post.insertedId);
    } catch (error) {
      throw error;
    }
  }
  //  # feature comment post OK
  static async updatePostComment(id, payload) {
    try {
      payload.createdAt = new Date();
      payload.updatedAt = new Date();
      await this.collection().updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $addToSet: {
            comments: payload,
          },
        }
      );
      await redis.del(CACHE_KEY_POSTS);
      return await this.findOne(id);
    } catch (error) {
      throw error;
    }
  }
  //  # feature like post OK
  static async updatePostLike(id, payload) {
    try {
      payload.createdAt = new Date();
      payload.updatedAt = new Date();
      await this.collection().updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $addToSet: {
            likes: payload,
          },
        }
      );
      await redis.del(CACHE_KEY_POSTS);
      return await this.findOne(id);
    } catch (error) {
      throw error;
    }
  }
};
