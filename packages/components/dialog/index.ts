import { defineComponent, h } from 'vue';

export const $dialog = defineComponent({
  name: '$dialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return () => {
      return h('div', 'dialog');
    };
  },
});

export const $dialogHeader = defineComponent({
  setup() {
    return;
  },
});
