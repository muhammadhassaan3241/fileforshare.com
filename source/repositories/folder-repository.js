const Folder = require("../models/folder-model");

class FolderRepository {
  constructor() {
    this.Folder = Folder;
  }
  async createFolder(FolderData) {
    try {
      const newFolder = await this.Folder.create(FolderData);
      return newFolder;
    } catch (error) {
      throw new Error("Failed to create Folder: " + error.message);
    }
  }

  async findFolder(query) {
    try {
      const Folder = await this.Folder.findOne(query);
      return Folder;
    } catch (error) {
      throw new Error("Failed to find Folder: " + error.message);
    }
  }

  async findFolders(query) {
    try {
      const Folders = await this.Folder.find(query);
      return Folders;
    } catch (error) {
      throw new Error("Failed to retrieve Folders: " + error.message);
    }
  }

  async updateFolder(query, updatedData) {
    try {
      const updatedFolder = await this.Folder.findByIdAndUpdate(
        query,
        updatedData,
        {
          new: true,
        }
      );
      return updatedFolder;
    } catch (error) {
      throw new Error("Failed to update Folder: " + error.message);
    }
  }

  async deleteFolder(query) {
    try {
      const deletedFolder = await this.Folder.findByIdAndDelete(query);
      return deletedFolder;
    } catch (error) {
      throw new Error("Failed to delete Folder: " + error.message);
    }
  }
}

const folderRepository = new FolderRepository();
module.exports = folderRepository;
