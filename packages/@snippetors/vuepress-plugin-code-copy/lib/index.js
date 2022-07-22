const { path } = require("@vuepress/utils");

module.exports = (options = {}, app) => ({
  define: {
    snippetorsCodeCopyOptions: {
      selector: options.selector || 'div[class*="language-"]',
      align: options.align || "bottom",
      color: options.color || "#27b1ff",
      backgroundColor: options.backgroundColor || "#0075b8",
      backgroundTransition: options.backgroundTransition !== false,
      successText: options.successText || "Copied!",
      successTextColor: options.successTextColor || options.color || "#27b1ff",
      staticIcon: options.staticIcon === true,
    },
  },
  name: "@snippetors/vuepress-plugin-code-copy",
  multiple: false,
  clientConfigFile: path.resolve(__dirname, "./client.js"),
});
