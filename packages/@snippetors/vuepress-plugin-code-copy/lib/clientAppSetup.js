import { createApp, onUpdated, onMounted, onBeforeUnmount, watch } from "vue";
import { usePageData } from "@vuepress/client";
import CodeCopy from "./components/CodeCopy.vue";
import { defineClientAppSetup } from "@vuepress/client";
import "./theme/style.css";

export default defineClientAppSetup(() => {
  const page = usePageData();

  const update = () => {
    setTimeout(() => {
      document.querySelectorAll(selector).forEach((el) => {
        if (el.classList.contains("code-copy-added")) return;
        let options = {
          align: align,
          color: color,
          backgroundTransition: backgroundTransition,
          backgroundColor: backgroundColor,
          successText: successText,
          successTextColor: successTextColor,
          staticIcon: staticIcon,
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
    }, 100);
  };

  onMounted(() => {
    update();
    window.addEventListener(
      "snippetors-vuepress-plugin-code-copy-update-event",
      update
    );
  });

  onBeforeUnmount(() => {
    window.removeEventListener(
      "snippetors-vuepress-plugin-code-copy-update-event",
      update
    );
  });

  onUpdated(() => {
    update();
  });

  watch(() => page.value.path, update);

  return update;
});
