import { createApp, onUpdated, onMounted } from "vue";
import CodeCopy from "./components/CodeCopy.vue";
import { defineClientAppSetup } from "@vuepress/client";
import "./theme/style.css";

export default defineClientAppSetup(() => {
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

  onMounted(update);
  onUpdated(update);

  return update;
});
