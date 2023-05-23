const Permission = require("../models/permission-model");

class PermissionRepository {
  async createPermission(permissionData) {
    try {
      const newPermission = await Permission.create(permissionData);
      return newPermission;
    } catch (error) {}
  }

  async findPermission(query) {
    try {
      const permission = await Permission.findOne(query);
      return permission;
    } catch (error) {}
  }

  async findPermissions(query) {
    try {
      const permissions = await Permission.find(query);
      return permissions;
    } catch (error) {}
  }

  async updatePermission(query, updatedData) {
    try {
      const updatedPermission = await Permission.findOneAndUpdate(
        query,
        updatedData,
        {
          new: true,
        }
      );
      return updatedPermission;
    } catch (error) {}
  }

  async deletePermission(query) {
    try {
      const deletedPermission = await Permission.findOneAndDelete(query);
      return deletedPermission;
    } catch (error) {}
  }
}

const permissionRepository = new PermissionRepository();
module.exports = permissionRepository;
