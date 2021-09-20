<template>
  <div
    :class="[
      'el-tabs__nav-wrap',
      scrollable ? 'is-scrollable' : '',
      `is-${rootTabs.tabPosition}`,
    ]"
  >
    <span
      v-if="scrollable"
      :class="['el-tabs__nav-prev', scrollable.prev ? '' : 'is-disabled']"
      @click="scrollPrev"
    >
      {{ "<" }}
    </span>
    <span
      v-if="scrollable"
      :class="['el-tabs__nav-next', scrollable.next ? '' : 'is-disabled']"
      @click="scrollNext"
    >
      {{ ">" }}
    </span>
    <div class="el-tabs__nav-scroll" ref="navScroll">
      <div
        :class="[
          'el-tabs__nav',
          `is-${rootTabs.tabPosition}`,
          {
            'is-stretch':
              stretch && ['top', 'bottom'].indexOf(rootTabs.tabPosition) !== -1,
          },
        ]"
        ref="nav"
        :style="navStyle"
        role="tablist"
        @keydown="changeTab($event)"
      >
        <div
          v-for="(pane, index) in panes"
          :class="{
            'el-tabs__item': true,
            [`is-${rootTabs.tabPosition}`]: true,
            'is-active': pane.active,
            'is-disabled': pane.disabled,
            'is-closable': getClosable(pane),
            'is-focus': isFocus,
          }"
          :id="`tab-${getTabName(pane, index)}`"
          :key="`tab-${getTabName(pane, index)}`"
          :aria-controls="`pane-${getTabName(pane, index)}`"
          role="tab"
          :aria-selected="pane.active"
          ref="tabs"
          :tabindex="pane.active ? 0 : -1"
          @focus="setFocus"
          @blur="removeFocus"
          @click="
            removeFocus();
            onTabClick(pane, getTabName(pane, index), $event);
          "
          @keydown="handleKeydown($event, pane)"
        >
          {{ pane.label }}
          <span
            v-if="getClosable(pane)"
            class="el-icon-close"
            @lick="onTabRemove(pane, $evenet)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from "../utils/resize-event";
function noop() {}
const firstUpperCase = (str) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
};
export default {
  name: "TabNav",
  inject: ["rootTabs"],
  props: {
    panes: Array,
    currentName: [String, Number],
    editable: Boolean,
    onTabClick: {
      type: Function,
      default: noop,
    },
    onTabRemove: {
      type: Function,
      default: noop,
    },
    type: String,
    stretch: Boolean,
  },
  data() {
    return {
      scrollable: false,
      navOffset: 0,
      isFocus: false,
      focusable: true,
    };
  },
  computed: {
    navStyle() {
      const dir =
        ["top", "bottom"].indexOf(this.rootTabs.tabPosition) !== -1 ? "X" : "Y";
      return {
        transform: `translate${dir}(-${this.navOffset}px)`,
      };
    },
    sizeName() {
      return ["top", "bottom"].indexOf(this.rootTabs.tabPosition) !== -1
        ? "width"
        : "height";
    },
  },
  methods: {
    scrollPrev() {
      const containerSize =
        this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`];
      const currentOffset = this.navOffset;
      if (!currentOffset) return;
      let newOffset =
        currentOffset > containerSize ? currentOffset - containerSize : 0;
      this.navOffset = newOffset;
    },
    scrollNext() {
      const navSize = this.$refs.nav[`offset${firstUpperCase(this.sizeName)}`];
      const containerSize =
        this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`];
      const currentOffset = this.navOffset;
      if (navSize - currentOffset <= containerSize) return;
      let newOffset =
        navSize - currentOffset > containerSize * 2
          ? currentOffset + containerSize
          : navSize - containerSize;
      this.navOffset = newOffset;
    },
    scrollToActiveTab() {
      if (!this.scrollable) return;
      const nav = this.$refs.nav;
      const activeTab = this.$el.querySelector(".is-active");
      if (!activeTab) return;
      const navScroll = this.$refs.navScroll;
      const activeTabBounding = activeTab.getBoundingClientRect();
      const navScrollBounding = navScroll.getBoundingClientRect();
      const maxOffset = nav.offsetWidth - navScrollBounding.width;
      const currentOffset = this.navOffset;
      let newOffset = currentOffset;
      if (activeTabBounding.left < navScrollBounding.left) {
        newOffset =
          currentOffset - (navScrollBounding.left - activeTabBounding.left);
      }
      if (activeTabBounding.right > navScrollBounding.right) {
        newOffset =
          currentOffset + activeTabBounding.right - navScrollBounding.right;
      }
      newOffset = Math.max(newOffset, 0);
      this.navOffset = Math.min(newOffset, maxOffset);
    },
    update() {
      if (!this.$refs.nav) return;
      const sizeName = this.sizeName;
      const navSize = this.$refs.nav[`offset${firstUpperCase(sizeName)}`];
      const containerSize =
        this.$refs.navScroll[`offset${firstUpperCase(sizeName)}`];
      const currentOffset = this.navOffset;
      if (containerSize < navSize) {
        const currentOffset = this.navOffset;
        this.scrollable = this.scrollable || {};
        this.scrollable.prev = currentOffset;
        this.scrollable.next = currentOffset + containerSize < navSize;
        if (navSize - currentOffset < containerSize) {
          this.navOffset = navSize - containerSize;
        }
      } else {
        this.scrollable = false;
        if (currentOffset > 0) {
          this.navOffset = 0;
        }
      }
    },
    changeTab(e) {
      const keyCode = e.keyCode;
      let nextIndex;
      let currentIndex, tabList;
      if ([37, 38, 39, 40].indexOf(keyCode) !== -1) {
        // 左右上下键更换tab
        tabList = e.currentTarget.querySelectorAll("[role=tab]");
        currentIndex = Array.prototype.indexOf.call(tabList, e.target);
      } else {
        return;
      }
      if (keyCode === 37 || keyCode === 38) {
        // left
        if (currentIndex === 0) {
          // first
          nextIndex = tabList.length - 1;
        } else {
          nextIndex = currentIndex - 1;
        }
      } else {
        // right
        if (currentIndex < tabList.length - 1) {
          // not last
          nextIndex = currentIndex + 1;
        } else {
          nextIndex = 0;
        }
      }
      tabList[nextIndex].focus(); // 改变焦点元素
      tabList[nextIndex].click(); // 选中下一个tab
      this.setFocus();
    },
    setFocus() {
      if (this.focusable) {
        this.isFocus = true;
      }
    },
    removeFocus() {
      this.isFocus = false;
    },
    visibilityChangeHandler() {
      const visibility = document.visibilityState;
      if (visibility === "hidden") {
        this.focusable = false;
      } else if (visibility === "visible") {
        setTimeout(() => {
          this.focusable = true;
        }, 50);
      }
    },
    windowBlurHandler() {
      this.focusable = false;
    },
    windowFocusHandler() {
      setTimeout(() => {
        this.focusable = true;
      }, 50);
    },
    getTabName(pane, index) {
      return pane.name || pane.index || index;
    },
    getClosable(pane) {
      return pane.isClosable || this.editable;
    },
    handleKeydown(ev, pane) {
      if (this.getClosable(pane) && (ev.keyCode === 46 || ev.keyCode === 8)) {
        this.onTabRemove(pane, ev);
      }
    },
  },
  updated() {
    this.update();
  },
  mounted() {
    addResizeListener(this.$el, this.update);
    document.addEventListener("visibilitychange", this.visibilityChangeHandler);
    window.addEventListener("blur", this.windowBlurHandler);
    window.addEventListener("focus", this.windowFocusHandler);
    setTimeout(() => {
      this.scrollToActiveTab();
    }, 0);
  },
  beforeDestroy() {
    if (this.$el && this.update) removeResizeListener(this.$el, this.update);
    document.removeEventListener(
      "visibilitychange",
      this.visibilityChangeHandler
    );
    window.removeEventListener("blur", this.windowBlurHandler);
    window.removeEventListener("focus", this.windowFocusHandler);
  },
};
</script>
