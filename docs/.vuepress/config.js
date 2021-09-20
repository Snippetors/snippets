const { path } = require("@vuepress/utils");

module.exports = {
  lang: "zh-Hans-CN",
  title: "Snippets",
  description: "即抄即用 Copy & Run",
  head: [["link", { rel: "icon", href: "/images/hero.svg" }]],
  plugins: [
    [require("../../packages/@snippetors/vuepress-plugin-tabs"), {}],
    [
      require("../../packages/@snippetors/vuepress-plugin-code-copy"),
      {
        color: "#757575",
        staticIcon: true,
        backgroundTransition: false,
      },
    ],
  ],
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
          children: ["/basic/","/basic/quicksort"],
        },
      ],
      "/data_structure/": [
        {
          title: "数据结构",
          children: ["/data_structure/", "/data_structure/trie"],
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
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdatedText: "上次更新",
    contributorsText: "贡献者",
    tip: "提示",
    warning: "注意",
    danger: "警告",
    notFound: [
      "这里什么都没有",
      "我们怎么到这来了？",
      "这是一个 404 页面",
      "看起来我们进入了错误的链接",
    ],
    backToHome: "返回首页",
    openInNewWindow: "在新窗口打开",
    toggleDarkMode: "切换夜间模式",
    toggleSidebar: "切换侧边栏",
  },
};
