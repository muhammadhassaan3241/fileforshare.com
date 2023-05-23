const User = require("../models/user-model");

class UserRepository {
  async createUser(userData) {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      throw new Error("Failed to create user: " + error.message);
    }
  }

  async findUser(query, fieldToPopulate) {
    try {
      if (!fieldToPopulate) {
        const user = await User.findOne(query);
        return user;
      }
      const user = await User.findOne(query).populate(fieldToPopulate);
      return user;
    } catch (error) {
      throw new Error("Failed to find user: " + error.message);
    }
  }

  async findUsers(query) {
    try {
      const users = await User.find(query);
      return users;
    } catch (error) {
      throw new Error("Failed to retrieve users: " + error.message);
    }
  }

  async updateUser(query, updatedData) {
    try {
      const updatedUser = await User.findOneAndUpdate(query, updatedData, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      throw new Error("Failed to update user: " + error.message);
    }
  }

  async deleteUser(query) {
    try {
      const deletedUser = await User.findOneAndDelete(query);
      return deletedUser;
    } catch (error) {
      throw new Error("Failed to delete user: " + error.message);
    }
  }
}

const userRepository = new UserRepository();
module.exports = userRepository;
