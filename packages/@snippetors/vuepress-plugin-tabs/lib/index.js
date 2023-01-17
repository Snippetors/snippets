import { path } from '@vuepress/utils'
import { markdownItPlugin } from './markdownItPlugin'

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
