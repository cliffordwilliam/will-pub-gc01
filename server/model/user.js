const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const Helper = require("../helper");

module.exports = class User {
  static collection() {
    return getDatabase().collection("users");
  }

  static async findAll() {
    try {
      return await this.collection()
        .find({}, { projection: { password: 0 } })
        .toArray();
    } catch (error) {
      throw error;
    }
  }

  static async findOne(id) {
    try {
      const user = await this.collection()
        .aggregate([
          {
            $match: {
              _id: new ObjectId(id),
            },
          },
          {
            $lookup: {
              from: "follows",
              localField: "_id",
              foreignField: "followingId",
              as: "followingConnection",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "followingConnection.followerId",
              foreignField: "_id",
              as: "follower",
            },
          },
          {
            $lookup: {
              from: "follows",
              localField: "_id",
              foreignField: "followerId",
              as: "followerConnection",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "followerConnection.followingId",
              foreignField: "_id",
              as: "following",
            },
          },
          {
            $project: {
              password: 0,
              "following.password": 0,
              "follower.password": 0,
            },
          },
        ])
        .toArray();
      if (user.length === 0) {
        return null;
      }
      return user[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByUsername(username, hidePassword = true) {
    try {
      const projection = hidePassword ? { password: 0 } : {};
      return await this.collection().findOne(
        { username: username },
        { projection: projection }
      );
    } catch (error) {
      throw error;
    }
  }
  //  # feature name / username search OK
  static async findByUsernameOrName(query) {
    try {
      const users = await User.collection()
        .find(
          {
            $or: [
              { name: { $regex: query, $options: "i" } },
              { username: { $regex: query, $options: "i" } },
            ],
          },
          { projection: { password: 0 } }
        )
        .toArray();
      return users;
    } catch (error) {
      throw error;
    }
  }
  //  # feature register OK
  static async register(payload) {
    try {
      let { username, email, password } = payload;
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        Helper.error("Username is already taken", 400); // validation unique OK
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Helper.error("Invalid email format", 400); // validation email format OK
      }
      if (password.length < 5) {
        Helper.error("Password must be at least 5 characters long", 400); // validation length min 5 OK
      }
      payload.password = await Helper.hash(password);
      const user = await this.collection().insertOne(payload);
      return await this.findOne(user.insertedId);
    } catch (error) {
      throw error;
    }
  }
  //  # feature login OK
  static async login(payload) {
    try {
      const { username, password } = payload;
      let user = await User.findByUsername(username, false);
      if (!user) {
        Helper.error("User not found", 404);
      }
      const passwordMatch = await Helper.compare(password, user.password);
      if (!passwordMatch) {
        Helper.error("Incorrect password", 401);
      }
      const token = Helper.sign({ username });
      const { password: _, ...userWithoutPassword } = user;
      return { user: userWithoutPassword, token };
    } catch (error) {
      throw error;
    }
  }
};
