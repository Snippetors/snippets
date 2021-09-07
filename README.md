# snippets
Code snippets, copy &amp; run

## 如何测试

```bash
git clone git@github.com:Snippetors/snippets.git
cd snippets
docker build -t snippets .
docker run -it -p 8080:80 snippets
```
打开浏览器，访问 http://localhost:8080/
