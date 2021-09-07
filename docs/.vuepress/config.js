module.exports = {
  plugins: [["vuepress-plugin-element-tabs", {}]],
  markdown: {
    lineNumbers: true,
  },
  title: "Snippets",
  description: "即抄即用 Copy & Run",
  themeConfig: {
    logo: "",
    repo: "Snippetors/snippets",
    docsDir: "docs",
    nav: [
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
