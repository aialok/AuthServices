const UserRepository = require("../repository/user-repository");

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
}

module.exports = UserServices;
