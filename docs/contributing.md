# 贡献指南

## 如何开发/测试

1. 安装node14
2. 安装yarn
3. 克隆这个仓库 `git@github.com:Snippetors/snippets.git`
4. `cd snippets`
4. `yarn install`
5. `yarn dev`

打开浏览器，访问 http://localhost:8080/

## 如何用docker测试
```bash
git clone git@github.com:Snippetors/snippets.git
cd snippets
docker build -t snippets .
docker run -it -p 8080:80 snippets
```
打开浏览器，访问 http://localhost:8080/

##  主要工具版本
1. node 14
2. yarn
3. vuepress 2

## 重要文件
1. [主要配置、目录](.vuepress/config.js)
2. [hello world 页面](misc/hello.md)
3. [代码片段库](https://github.com/Snippetors/snippets/tree/main/docs/snippets)

## 模板添加流程

1. 在[代码片段库](https://github.com/Snippetors/snippets/tree/main/docs/snippets)中有四种语言的分类目录，Java用户请以gradle项目导入IDE，其他语言自不必多言
2. 在相应位置添加代码，文件分组请遵循最终目录分组。例如`杂项/hello`页面应处于`misc`目录之下。从目录文件[目录文件](.vuepress/config.js)的`navbar`部分也可以看出这样的分组情况。
3. 在相应位置添加测试代码，同样，请依照各个hello测试文件
4. 查看[目录文件](.vuepress/config.js)，如有必要，请添加/修改目录
5. 查看相应位置的markdown文件，如[hello.md](misc/hello.md)，如有必要，请添加/修改。关于如何导入代码块，请参照[文档](https://v2.vuepress.vuejs.org/zh/guide/markdown.html#%E5%AF%BC%E5%85%A5%E4%BB%A3%E7%A0%81%E5%9D%97)。关于如何使用tabs插件，请查看[文档](https://snippetors.github.io/plugins/vuepress-plugin-tabs.html) （但常规情况下，你不需要对该插件做任何其他设定）
6. git操作规范

```bash
git pull -r main
git checkout -b feature_branch（请根据你添加的内容自己命名你的分支）
...添加修改
git add xxx
git commit
git push --set-upstream origin feature_branch
```

7. 建立Pull Request
8. GitHub Action 应该会自动跑起来，当检查失败时，请检查失败的原因（Test失败，或者代码格式不符）
9. 当相应的代码审查者批准Pull Request后，你的分支将自动合并

## 测试框架

1. C++ 使用[GoogleTest](https://github.com/google/googletest)
1. Java 使用[JUnit 5](https://junit.org/junit5/)
1. Python 使用[Pytest](https://docs.pytest.org/)
1. Go 使用[内置测试模块](https://pkg.go.dev/testing)

## 代码风格检查

1. C++ 使用[cpplint](https://github.com/cpplint/cpplint)
1. Java 使用[checkstyle](https://github.com/checkstyle/checkstyle)，风格在Google风格上略有改动，详情请见[配置文件](snippets/java/config/checkstyle/checkstyle.xml)
1. Python 使用[flake8](https://flake8.pycqa.org/en/latest/)
1. Go 使用[内置检查模块](https://pkg.go.dev/cmd/vet)
