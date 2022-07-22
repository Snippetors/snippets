import Tabs from "./components/Tabs.vue";
import TabPane from "./components/Tab-pane.vue";

import { defineClientConfig } from "@vuepress/client";

import "./theme/tabs.scss";

export default defineClientConfig({
  enhance({ app }) {
    app.component("Tabs", Tabs);
    app.component("Tab", TabPane);
  },
});
