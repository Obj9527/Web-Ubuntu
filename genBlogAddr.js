const fs = require("fs");
const { join } = require("path");

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
        mdFiles.push({
          id: item,
          url: "./files/" + item,
          updatedTime: stat.mtimeMs,
          createdTime: stat.birthtimeMs,
        });
      }
    });
  };
  findMarkdownFiles("./public/files");
  let obj = {
    articles: mdFiles,
    total: mdFiles.length,
  };
  fs.writeFileSync("./public/files/mdFilesAddress.json", JSON.stringify(obj));
  console.log(obj);
}

genBlogAddrs();
