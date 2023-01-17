import { getDirname, path } from '@vuepress/utils'
import { markdownItPlugin } from './markdownItPlugin.js'

const __dirname = getDirname(import.meta.url)

export default function (options) {
  return {
    name: "@snippetors/vuepress-plugin-tabs",
    multiple: false,
    clientConfigFile: path.resolve(__dirname, "./client.js"),
    bundlerConfig: {
      scss: {
        includePath: ["./theme/tabs.scss"],
      },
    },
    extendsMarkdown: markdownItPlugin(options),
  }
};
