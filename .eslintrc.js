module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  // rules should be one of the following: 0 = off, 1 = warn, 2 = error
  rules: {
    "no-console": 0,
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
