const fs = require("fs");
const { join } = require("path");

function handleMockArray() {
  const mockArray = [];
  const getFiles = (jsonPath) => {
    const jsonFiles = [];
    const findJsonFile = (path) => {
      const files = fs.readdirSync(path);
      files.forEach((item) => {
        const fPath = join(path, item);
        const stat = fs.statSync(fPath);
        if (stat.isDirectory() === true) findJsonFile(item);
        if (stat.isFile() === true) jsonFiles.push(item);
      });
    };
    findJsonFile(jsonPath);
    jsonFiles.forEach((item) => mockArray.push(`./controller/${item}`));
  };
  getFiles("mock/controller");
  return mockArray;
}

module.exports = {
  handleMockArray,
};
