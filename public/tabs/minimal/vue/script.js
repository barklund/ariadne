const tablist = {
  props: ["name"],
  template: `
    <ul
      :aria-label="name"
      class="tablist"
      role="tablist"
      @keydown.left="$emit('goto', $event, -1)"
      @keydown.right="$emit('goto', $event, 1)"
    >
      <slot />
    </ul>`,
};

const tab = {
  props: ["id", "isActive"],
  template: `<li
    :id="id"
    :aria-controls="'panel-'+id"
    :aria-selected="isActive"
    :tabindex="isActive ? 0 : -1"
    :class="{ tab: true, 'tab--active': isActive }"
    @focus="$emit('switch')"
    role="tab"
  >
    <slot />
  </li>`,
};

const tabpanel = {
  props: ["id", "isActive"],
  template: `
    <section
      :aria-labelledby="id"
      :id="'panel-'+id"
      :hidden="!isActive"
      class="tabpanel"
      role="tabpanel"
    >
      <slot />
    </section>
  `,
};

const tabs = {
  props: ["name", "initial", "tabs"],
  data() {
    return {
      activeTab: this.initial,
    };
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
    },
    gotoTab($event, dir) {
      const readingDir = getComputedStyle($event.target).direction === 'ltr' ? 1 : -1;
      const isNext = readingDir === dir;
      const neighbor = isNext ? $event.target.nextSibling : $event.target.previousSibling;
      if (neighbor) {
        neighbor.focus();
      }
    },
  },
  components: {
    tab,
    tablist,
    tabpanel,
  },
  template: `<section>
    <tablist
      :name="name"
      @goto="gotoTab"
    >
      <tab
        v-for="tab in tabs"
        :key="tab"
        :id="tab"
        :isActive="activeTab === tab"
        @switch="switchTab(tab)"
      >
        <slot :name="'tab-'+tab" />
      </tab>
    </tablist>
    <tabpanel
      v-for="tab in tabs"
      :key="tab"
      :id="tab"
      :isActive="activeTab === tab"
    >
      <slot :name="'panel-'+tab" />
    </tabpanel>
  </section>`,
};

const app = new Vue({
  el: "#root",
  components: {
    tabs,
  },
});
