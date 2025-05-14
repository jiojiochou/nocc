import { defineComponent, h } from 'vue';

export const Dialog = defineComponent({
  name: '$dialog',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // render函数 === template
    return () => {
      return h('div', { hidden: !props.open }, 'dialog');
    };
  },
});
