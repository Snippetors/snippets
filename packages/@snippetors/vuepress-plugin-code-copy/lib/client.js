import { defineClientConfig } from "@vuepress/client";
import { createApp, onUpdated, onMounted, onBeforeUnmount, watch } from "vue";
import { usePageData } from "@vuepress/client";

import CodeCopy from "./components/CodeCopy.vue";

import "./theme/style.css";

export default defineClientConfig({
  enhance({ app }) {
    app.component("CodeCopy", CodeCopy);
  },
  setup() {
    const page = usePageData();

    const update = () => {
      setTimeout(() => {
        document.querySelectorAll(snippetorsCodeCopyOptions.selector).forEach((el) => {
          if (el.classList.contains("code-copy-added")) return;
          let options = {
            align: snippetorsCodeCopyOptions.align,
            color: snippetorsCodeCopyOptions.color,
            backgroundTransition: snippetorsCodeCopyOptions.backgroundTransition,
            backgroundColor: snippetorsCodeCopyOptions.backgroundColor,
            successText: snippetorsCodeCopyOptions.successText,
            successTextColor: snippetorsCodeCopyOptions.successTextColor,
            staticIcon: snippetorsCodeCopyOptions.staticIcon,
          };
          let instance = createApp(CodeCopy, {
            parent: el,
            code: el.querySelector("pre").innerText,
            options: options,
          });
          let childEl = document.createElement("div");
          el.appendChild(childEl);
          instance.mount(childEl);

          el.classList.add("code-copy-added");
        });
      }, 500); // should be greater than the page transition duration https://github.com/vuepress/vuepress-next/blob/13ab3906728a8356402c91d8ecdf61152b842d8e/packages/%40vuepress/theme-default/src/client/styles/transitions.scss#L12-L17
    };

    onMounted(() => {
      update();
      window.addEventListener("snippetors-vuepress-plugin-code-copy-update-event", update);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("snippetors-vuepress-plugin-code-copy-update-event", update);
    });

    onUpdated(() => {
      update();
    });

    watch(() => page.value.path, update);
  },
});
