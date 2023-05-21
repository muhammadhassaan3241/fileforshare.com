const User = require("../models/user-model");

class UserRepository {
  constructor() {
    this.User = User;
  }

  async createUser(userData) {
    try {
      const newUser = await this.User.create(userData);
      return newUser;
    } catch (error) {
      throw new Error("Failed to create user: " + error.message);
    }
  }

  async findUser(query) {
    try {
      const user = await this.User.findOne(query);
      return user;
    } catch (error) {
      throw new Error("Failed to find user: " + error.message);
    }
  }

  async findUsers(query) {
    try {
      const users = await this.User.find(query);
      return users;
    } catch (error) {
      throw new Error("Failed to retrieve users: " + error.message);
    }
  }

  async updateUser(query, updatedData) {
    try {
      const updatedUser = await this.User.findByIdAndUpdate(
        query,
        updatedData,
        {
          new: true,
        }
      );
      return updatedUser;
    } catch (error) {
      throw new Error("Failed to update user: " + error.message);
    }
  }

  async deleteUser(query) {
    try {
      const deletedUser = await this.User.findByIdAndDelete(query);
      return deletedUser;
    } catch (error) {
      throw new Error("Failed to delete user: " + error.message);
    }
  }
}

const userRepository = new UserRepository();
module.exports = userRepository;
