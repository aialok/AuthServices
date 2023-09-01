const UserRepository = require("../repository/user-repository");
var jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../config/serverConfig");

class UserServices {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something worng in user repository");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const response = await this.UserRepository.destroy(userId);
      return response;
    } catch (error) {
      console.log("Something worng in user repository");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_TOKEN, { expiresIn: "1d" });

      return result;
    } catch (error) {
      console.log("Token creation failed", error);
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_TOKEN);
      return response;
    } catch (error) {
      console.log("Token verification failed", error);
      throw error;
    }
  }
}

module.exports = UserServices;
