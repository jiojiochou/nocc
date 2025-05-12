import { defineComponent, h } from 'vue';

export const dialog = defineComponent({
  name: 'dialog',
  setup() {
    return () => {
      return h('div', 'dialog');
    };
  },
});
