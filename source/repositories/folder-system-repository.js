const fs = require("fs").promises;
const path = require("path");
const basePath = require("../app");

class FolderRepository {
  constructor() {
    this.basePath = basePath.appFolders;
  }

  async createFolder(folderName) {
    const folderPath = path.join(this.basePath, folderName);

    try {
      const newFolder = await fs.mkdir(folderPath);
      return newFolder;
    } catch (error) {
      console.error(`Error creating folder: ${folderPath}`, error);
      throw error;
    }
  }

  async deleteFolder(folderName) {
    const folderPath = path.join(this.basePath, folderName);

    try {
      const deletedFolder = await fs.rm(folderPath, { recursive: true });
      return deletedFolder;
    } catch (error) {
      console.error(`Error deleting folder: ${folderPath}`, error);
      throw error;
    }
  }

  async getFolders() {
    try {
      const folders = await fs.readdir(this.basePath);
      return folders;
    } catch (error) {
      console.error("Error retrieving folders", error);
      throw error;
    }
  }
}

const folderRepository = new FolderRepository();
module.exports = folderRepository;
