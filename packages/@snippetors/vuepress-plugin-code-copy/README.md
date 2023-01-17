# vuepress-plugin-code-copy

[![npm](https://badgen.net/npm/v/@snippetors/vuepress-plugin-code-copy)](https://www.npmjs.com/package/@snippetors/vuepress-plugin-code-copy)
[![downloads](https://badgen.net/npm/dt/@snippetors/vuepress-plugin-code-copy)](https://www.npmjs.com/package/@snippetors/vuepress-plugin-code-copy)
[![license](https://badgen.net/github/license/Snippetors/snippets)](https://github.com/Snippetors/snippets/blob/main/LICENSE)

This plugin is inspired by [vuepress-plugin-code-copy](https://github.com/znicholasbrown/vuepress-plugin-code-copy), but for Vue 3.x and VuePress 2.x

<mark>VuePress is evolving rapidly, and there's no stable version yet. This plugin is only tested with VuePress version 2.0.0-beta.60</mark>

## Documentation

https://snippetors.github.io/plugins/vuepress-plugin-code-copy

## Install

> This plugin requries [VuePress>=2.0.0](https://github.com/vuepress/vuepress-next)

```sh
yarn add -D @snippetors/vuepress-plugin-code-copy
```

```js
// .vuepress/config.js
import codeCopyPlugin from '@snippetors/vuepress-plugin-code-copy'

export default {
  plugins: [
    codeCopyPlugin(options),
  ],
}
```

## License

[MIT](https://github.com/Snippetors/snippets/blob/main/LICENSE)
