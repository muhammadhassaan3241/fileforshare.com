const Role = require("../models/role-model");

class UserRepository {
  async createRole(roleData) {
    try {
      const newRole = await Role.create(roleData);
      return newRole;
    } catch (error) {}
  }

  async findRole(query, fieldToPopulate) {
    try {
      if (!fieldToPopulate) {
        const role = await Role.findOne(query);
        return role;
      }
      const role = await Role.findOne(query).populate(fieldToPopulate);
      return role;
    } catch (error) {}
  }

  async findRoles(query) {
    try {
      const roles = await Role.find(query);
      return roles;
    } catch (error) {}
  }

  async updateRole(query, updatedData) {
    try {
      const updatedRole = await Role.findOneAndUpdate(query, updatedData, {
        new: true,
      });
      return updatedRole;
    } catch (error) {}
  }

  async deleteRole(query) {
    try {
      const deletedRole = await Role.findOneAndDelete(query);
      return deletedRole;
    } catch (error) {}
  }
}

const userRepository = new UserRepository();
module.exports = userRepository;
