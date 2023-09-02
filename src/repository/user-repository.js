const { User, Role } = require("../models/index");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong on the repository layer");
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const response = await User.destroy({
        where: {
          id: userId,
        },
      });
      return response;
    } catch (error) {
      console.log("Something went wrong on the repository layer", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const user = await User.findByPk(id, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on the repository layer");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });

      return user;
    } catch (error) {
      console.log("Something went wrong on the repository layer");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      console.log(user);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });

      const response = user.hasRole(adminRole);
      return response;
    } catch (error) {
      console.log("Something went wrong on the repository layer", error);
      throw error;
    }
  }
}

module.exports = UserRepository;
