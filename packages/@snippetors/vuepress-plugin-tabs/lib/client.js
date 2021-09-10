import Tabs from "./components/Tabs.vue";
import TabPane from "./components/Tab-pane.vue";

import { defineClientAppEnhance } from "@vuepress/client";

import "./theme/tabs.scss";

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component("Tabs", Tabs);
  app.component("Tab", TabPane);
});
