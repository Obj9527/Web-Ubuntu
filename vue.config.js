// 判断为开发环境则使用mock
const mockServer = () => {
  if (process.env.NODE_ENV === "development") return require("./mock");
  else return "";
};

module.exports = {
  devServer: {
    port: 8081, // 端口
    open: true,
    after: mockServer(),
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Web Ubuntu";
      return args;
    });
  },
};
