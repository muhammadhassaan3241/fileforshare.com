const File = require("../models/file-model");

class FileRepository {
  async createFile(fileData) {
    try {
      const newFile = await File.create(fileData);
      return newFile;
    } catch (error) {
      throw new Error("Failed to create file: " + error.message);
    }
  }

  async findFile(query) {
    try {
      const file = await File.findById(query);
      return file;
    } catch (error) {
      throw new Error("Failed to find file: " + error.message);
    }
  }

  async findFiles(query) {
    try {
      const files = await File.find(query);
      return files;
    } catch (error) {
      throw new Error("Failed to retrieve files: " + error.message);
    }
  }

  async updateFile(query, updatedData) {
    try {
      const updatedFile = await File.findByIdAndUpdate(query, updatedData, {
        new: true,
      });
      return updatedFile;
    } catch (error) {
      throw new Error("Failed to update file: " + error.message);
    }
  }

  async deleteFile(query) {
    try {
      const deletedFile = await File.findByIdAndDelete(query);
      return deletedFile;
    } catch (error) {
      throw new Error("Failed to delete file: " + error.message);
    }
  }
}

const fileRepository = new FileRepository();
module.exports = fileRepository;
