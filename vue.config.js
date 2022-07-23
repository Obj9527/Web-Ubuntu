const path = require("path");

// 判断为开发环境则使用mock
const mockServer = () => {
  if (process.env.NODE_ENV === "development") return require("./mock");
  else return "";
};

const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  devServer: {
    port: 8082, // 端口
    open: true,
    after: mockServer(),
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          "@": resolve("src"),
        },
      },
    };
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Web Ubuntu";
      return args;
    });
  },
};
