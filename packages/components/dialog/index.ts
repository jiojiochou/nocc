import { defineComponent, h, watch } from 'vue'

export const DialogPanel = defineComponent({
  name: '$dialogPanel',
  props: {
    as: {
      type: String,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      return h(props.as, { ...attrs }, slots)
    }
  },
})

export const DialogTitle = defineComponent({
  name: '$dialogTitle',
  props: {
    as: {
      type: String,
      default: 'h2',
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      return h(props.as, { ...attrs }, slots)
    }
  },
})

export const Dialog = defineComponent({
  name: '$dialog',
  props: {
    as: {
      type: String,
      default: 'div',
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:open'],
  setup(props, { attrs, slots, emit }) {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        emit('update:open', false)
      }
    }

    watch(() => props.open, (val: boolean) => {
      if (val) {
        document.addEventListener('keydown', handleKeydown)
      }
      else {
        document.removeEventListener('keydown', handleKeydown)
      }
    })

    // render函数 === template
    return () => {
      return props.open
        ? h(props.as, { 'hidden': !props.open, ...attrs, 'role': 'dialog', 'aria-modal': true }, slots)
        : null
    }
  },
})
