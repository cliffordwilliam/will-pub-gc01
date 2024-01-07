const Helper = require("./helper");
const User = require("./model/user");

module.exports = class Middleware {
  static async tokenGuard(req) {
    const headerAuthorization = req.headers.authorization;

    if (!headerAuthorization) {
      Helper.error("Unauthorized", 401);
    }

    const token = headerAuthorization.split(" ")[1];
    const payload = Helper.verify(token);

    const user = await User.findByUsername(payload.username);

    if (!user) {
      Helper.error("Invalid token", 401);
    }

    const loggedUser = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    return loggedUser;
  }
};
