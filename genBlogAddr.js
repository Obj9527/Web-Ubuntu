const fs = require("fs");
const { join } = require("path");

const genAddressJson = (mdFiles, prefix = "./files/") => {
  let obj = {};
  let addrs = [];
  mdFiles.forEach((item) => {
    addrs.push({
      addr: prefix + item,
    });
  });
  obj.addrs = addrs;
  fs.writeFileSync("./public/files/mdFilesAddress.json", JSON.stringify(obj));
};

function genBlogAddrs() {
  const mdFiles = [];
  const findMarkdownFiles = (path) => {
    const files = fs.readdirSync(path);
    files.forEach((item) => {
      const fPath = join(path, item);
      const stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findMarkdownFiles(item);
      }
      if (stat.isFile() && item.indexOf(".md") > -1) {
        mdFiles.push(item);
      }
    });
  };
  findMarkdownFiles("./public/files");
  genAddressJson(mdFiles);
  console.log(mdFiles);
}

genBlogAddrs();
