const fs = require("fs");
const path = require("path");
const readline = require("readline");

class FileSystemRepository {
  constructor() {
    this.fileCache = {};
  }

  // Batch read operation
  batchReadFiles(filePaths, callback) {
    const fileData = [];

    // Use asynchronous iteration to read files in parallel
    Promise.all(
      filePaths.map((filePath) => {
        return new Promise((resolve, reject) => {
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
              reject(err);
            } else {
              fileData.push(data);
              resolve();
            }
          });
        });
      })
    )
      .then(() => {
        callback(null, fileData);
      })
      .catch((err) => {
        callback(err);
      });
  }

  // File caching
  readCachedFile(filePath, callback) {
    if (this.fileCache[filePath]) {
      callback(null, this.fileCache[filePath]);
    } else {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (!err) {
          this.fileCache[filePath] = data;
        }
        callback(err, data);
      });
    }
  }

  // Asynchronous operations
  readFile(filePath, callback) {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    const lines = [];

    lineReader.on("line", (line) => {
      lines.push(line);
    });

    lineReader.on("close", () => {
      callback(null, lines);
    });

    lineReader.on("error", (err) => {
      callback(err);
    });
  }

  // Stream processing
  processFileStream(inputFilePath, outputFilePath, callback) {
    const readStream = fs.createReadStream(inputFilePath, "utf8");
    const writeStream = fs.createWriteStream(outputFilePath, "utf8");

    readStream.pipe(writeStream);
    writeStream.on("finish", callback);
    writeStream.on("error", callback);
  }

  // Directory indexing
  getIndex(directoryPath, callback) {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        callback(err);
      } else {
        const index = {};

        files.forEach((file) => {
          const filePath = path.join(directoryPath, file);
          const stats = fs.statSync(filePath);

          if (stats.isFile()) {
            index[file] = filePath;
          }
        });

        callback(null, index);
      }
    });
  }

  // Error handling
  writeFile(filePath, content, callback) {
    const lines = content.split("\n");

    const writeStream = fs.createWriteStream(filePath);

    lines.forEach((line) => {
      writeStream.write(line + "\n");
    });

    writeStream.end();
    writeStream.on("finish", () => {
      console.log("File created successfully.");
      callback(content);
    });

    writeStream.on("error", (err) => {
      console.error(err);
      callback(err);
    });
  }
}

// Usage examples
const fileSystemRepo = new FileSystemRepository();
module.exports = fileSystemRepo;

// fileSystemRepo.batchReadFiles(
//   ["file1.txt", "file2.txt", "file3.txt"],
//   (err, fileData) => {
//     if (!err) {
//       console.log(fileData);
//     }
//   }
// );

// fileSystemRepo.readCachedFile("cachedFile.txt", (err, data) => {
//   if (!err) {
//     console.log(data);
//   }
// });

// fileSystemRepo.readFile("file.txt", (err, data) => {
//   if (!err) {
//     console.log(data);
//   }
// });

// fileSystemRepo.processFileStream("input.txt", "output.txt", (err) => {
//   if (err) {
//     console.error("Failed to process file stream:", err);
//   } else {
//     console.log("File stream processed successfully.");
//   }
// });

// fileSystemRepo.getIndex("/path/to/directory", (err, index) => {
//   if (!err) {
//     console.log(index);
//   }
// });

// fileSystemRepo.writeFileWithRetry("file.txt", "data", (err) => {
//   if (err) {
//     console.error("Failed to write file:", err);
//   } else {
//     console.log("File written successfully.");
//   }
// });
