const path = require("path");

module.exports = {
  lang: "zh-Hans-CN",
  title: "Snippets",
  description: "即抄即用 Copy & Run",
  plugins: [[require("../../packages/@snippetors/vuepress-plugin-tabs"), {}]],
  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@snippets/, path.resolve(__dirname, "../snippets")),
    },
  },
  themeConfig: {
    logo: "",
    logoDark: "",
    repo: "Snippetors/snippets",
    docsDir: "docs",
    navbar: [
      { text: "简介", link: "/" },
      { text: "杂项", link: "/misc/hello" },
    ],
    sidebar: {
      "/misc/": [
        {
          title: "杂项",
          children: ["/misc/hello"],
        },
      ],
    },
    lastUpdated: "上次更新",
  },
};
