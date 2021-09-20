<template>
  <div
    :class="{
      'el-tabs': true,
      'el-tabs--card': type === 'card',
      [`el-tabs--${tabPosition}`]: true,
      'el-tabs--border-card': type === 'border-card',
    }"
  >
    <div
      v-if="tabPosition !== 'bottom'"
      :class="['el-tabs__header', `is-${tabPosition}`]"
    >
      <span
        v-if="editable || addable"
        class="el-tabs__new-tab"
        @click="handleTabAdd"
        tabindex="0"
        @keydown="handleKeydown($event)"
      >
        <i class="el-icon-plus"></i>
      </span>
      <tab-nav
        ref="nav"
        :panes="panes"
        :currentName="currentName"
        :editable="editable"
        :onTabClick="handleTabClick"
        :onTabRemove="handleTabRemove"
        :type="type"
        :stretch="stretch"
      ></tab-nav>
    </div>
    <div class="el-tabs__content">
      <slot></slot>
    </div>
    <div
      v-if="tabPosition === 'bottom'"
      :class="['el-tabs__header', `is-${tabPosition}`]"
    >
      <span
        v-if="editable || addable"
        class="el-tabs__new-tab"
        @click="handleTabAdd"
        tabindex="0"
        @keydown="handleKeydown($event)"
      >
        <i class="el-icon-plus"></i>
      </span>
      <tab-nav
        ref="nav"
        :panes="panes"
        :currentName="currentName"
        :editable="editable"
        :onTabClick="handleTabClick"
        :onTabRemove="handleTabRemove"
        :type="type"
        :stretch="stretch"
      ></tab-nav>
    </div>
  </div>
</template>

<script>
import TabNav from "./Tab-nav.vue";

export default {
  name: "ElTabs",
  components: {
    TabNav,
  },
  props: {
    type: {
      type: String,
      default: "border-card",
    },
    activeName: String,
    closable: Boolean,
    addable: Boolean,
    value: {},
    editable: Boolean,
    tabPosition: {
      type: String,
      default: "top",
    },
    beforeLeave: Function,
    stretch: Boolean,
    events: Array,
  },
  provide() {
    return {
      rootTabs: this,
    };
  },
  data() {
    return {
      currentName: this.value || this.activeName,
      paneLib: {},
      panes: [],
    };
  },
  watch: {
    activeName(value) {
      this.setCurrentName(value);
    },
    value(value) {
      this.setCurrentName(value);
    },
    currentName(value) {
      if (this.$refs.nav) {
        this.$nextTick(() => {
          this.$refs.nav.$nextTick((_) => {
            this.$refs.nav.scrollToActiveTab();
          });
        });
      }
    },
  },
  methods: {
    calcPaneInstances(isForceUpdate = false) {
      if (this.$slots.default()) {
        const paneSlots = this.$slots
          .default()
          .filter((vnode) => vnode.type.componentName === "ElTabPane");
        // update indeed
        const panes = paneSlots.map(({ props }) => this.paneLib[props.label]);
        const panesChanged = !(
          panes.length === this.panes.length &&
          panes.every((pane, index) => pane === this.panes[index])
        );
        if (isForceUpdate || panesChanged) {
          this.panes = panes;
        }
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }
    },
    handleTabClick(tab, tabName, event) {
      if (tab.disabled) return;
      this.setCurrentName(tabName);
      this.$emit("tab-click", tab, event);
    },
    handleTabRemove(pane, ev) {
      if (pane.disabled) return;
      ev.stopPropagation();
      this.$emit("edit", pane.name, "remove");
      this.$emit("tab-remove", pane.name);
    },
    handleTabAdd() {
      this.$emit("edit", null, "add");
      this.$emit("tab-add");
    },
    setCurrentName(value) {
      const changeCurrentName = () => {
        this.currentName = value;
        this.$emit("input", value);
      };
      if (this.currentName !== value && this.beforeLeave) {
        const before = this.beforeLeave(value, this.currentName);
        if (before && before.then) {
          before.then(
            () => {
              changeCurrentName();
              this.$refs.nav && this.$refs.nav.removeFocus();
            },
            () => {
              // https://github.com/ElemeFE/element/pull/14816
              // ignore promise rejection in `before-leave` hook
            }
          );
        } else if (before !== false) {
          changeCurrentName();
        }
      } else {
        changeCurrentName();
      }
    },
    handleKeydown(ev) {
      if (ev.keyCode === 13) {
        handleTabAdd();
      }
    },
  },
  created() {
    if (!this.currentName) {
      this.setCurrentName(0);
    }
  },
  mounted() {
    this.calcPaneInstances();
  },
  updated() {
    this.calcPaneInstances();

    for (const e of this.events) {
      window.dispatchEvent(new Event(e));
    }
  },
};
</script>
