const UserRepository = require("../repository/user-repository");
var jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

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

  async signIn(userEmail, userPassword) {
    try {
      // step 1 -> fetch the user using the email
      const response = await this.userRepository.getByEmail(userEmail);

      // step->2 compare the incoming plain password with stores encrypted password
      const passwordMatch = this.checkPassword(userPassword, response.password);

      if (!passwordMatch) {
        console.log("Password does not match");
        throw { error: "Incorrect password" };
      }

      // step-> 3 if password match then create a token and send it to the user
      const newJwt = this.createToken({
        email: response.email,
        id: response.id,
      });
      return newJwt;
    } catch (error) {
      console.log("Something wrong in signIn");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);

      if (!response) {
        console.log("Invalid token");
        throw { errpr: "Invalid token" };
      }

      const user = await this.userRepository.getById(response.id);

      if (!user) {
        console.log("Token is expired now");
        throw { error: "Token is expired now" };
      }

      return response;
    } catch (error) {
      console.log("Something wrong in authenticating jwt token", error);
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const response = await this.userRepository.deleteUser(userId);
      return response;
    } catch (error) {
      console.log("Something wrong in user service", error);
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      return await this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("Something wrong checking isAdmin", error);
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

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison", error);
      throw error;
    }
  }
}

module.exports = UserServices;
