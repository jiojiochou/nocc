import { defineComponent, h } from 'vue'

export const TransitionRoot = defineComponent({
  setup() {
    return () => {
      return h('div', 'hello word!!!')
    }
  },
})
