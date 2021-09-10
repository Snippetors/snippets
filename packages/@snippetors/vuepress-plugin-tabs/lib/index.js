const path = require("path");

module.exports = (options, app) => ({
  name: "@snippetors/vuepress-plugin-tabs",
  multiple: false,
  clientAppEnhanceFiles: [path.resolve(__dirname, "./client.js")],
  bundlerConfig: {
    scss: {
      includePath: ["./theme/tabs.scss"],
    },
  },
  extendsMarkdown: require("./markdownItPlugin"),
});
