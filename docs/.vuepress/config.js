const { path } = require("@vuepress/utils");

module.exports = {
  lang: "zh-Hans-CN",
  title: "Snippets",
  description: "即抄即用 Copy & Run",
  head: [["link", { rel: "icon", href: "/images/hero.svg" }]],
  plugins: [[require("../../packages/@snippetors/vuepress-plugin-tabs"), {}]],
  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@snippets/, path.resolve(__dirname, "../snippets")),
    },
  },
  extendsMarkdown: (md) => {
    md.use(require("markdown-it-pangu"));
  },
  themeConfig: {
    logo: "/images/hero.svg",
    repo: "Snippetors/snippets",
    docsDir: "docs",
    navbar: [
      { text: "简介", link: "/intro/" },
      { text: "基础算法", link: "/basic/" },
      { text: "数据结构", link: "/data_structure/" },
      { text: "搜索", link: "/search/" },
      { text: "动态规划", link: "/dp/" },
      { text: "字符串", link: "/string/" },
      { text: "数学", link: "/math/" },
      { text: "图论", link: "/graph/" },
      { text: "计算几何", link: "/geometry/" },
      { text: "杂项", link: "/misc/" },
    ],
    sidebar: {
      "/intro/": [
        {
          title: "简介",
          children: ["/intro/"],
        },
      ],
      "/basic/": [
        {
          title: "基础算法",
          children: ["/basic/"],
        },
      ],
      "/data_structure/": [
        {
          title: "数据结构",
          children: ["/data_structure/"],
        },
      ],
      "/search/": [
        {
          title: "搜索",
          children: ["/search/"],
        },
      ],
      "/dp/": [
        {
          title: "动态规划",
          children: ["/dp/"],
        },
      ],
      "/string/": [
        {
          title: "字符串",
          children: ["/string/"],
        },
      ],
      "/math/": [
        {
          title: "数学",
          children: ["/math/", "/math/fastpow"],
        },
      ],
      "/graph/": [
        {
          title: "图论",
          children: ["/graph/"],
        },
      ],
      "/geometry/": [
        {
          title: "计算几何",
          children: ["/geometry/"],
        },
      ],
      "/misc/": [
        {
          title: "杂项",
          children: ["/misc/", "/misc/hello"],
        },
      ],
    },
    lastUpdated: "上次更新",
  },
};
