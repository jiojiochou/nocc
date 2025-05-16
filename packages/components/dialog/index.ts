import { defineComponent, h } from 'vue';

export const Dialog = defineComponent({
  name: '$dialog',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:open'],
  setup(props, { emit, slots }) {
    // render函数 === template
    return () => {
      return h('div', { hidden: !props.open }, slots);
    };
  },
});
