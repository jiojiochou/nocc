import type { Component } from 'vue'
import { defineComponent, h, inject, provide, watch } from 'vue'

const DIALOG_CONTEXT = Symbol('DIALOG_CONTEXT')

function useDialogContext(key: typeof DIALOG_CONTEXT, component: Component) {
  if (!component) {
    throw new Error('<component /> 不能使用!!!')
  }
  return inject(key)
}

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

    provide(DIALOG_CONTEXT, {
      close: () => emit('update:open', false),
    })

    // render函数 === <template />
    return () => {
      return props.open
        ? h(props.as, {
            'hidden': !props.open,
            ...attrs,
            'role': 'dialog',
            'aria-modal': true,
            'aria-label': '', // warning | error
          }, slots)
        : null
    }
  },
})

export const DialogOverlay = defineComponent({
  name: '$dialogOverlay',
  props: {
    as: {
      type: String,
      default: 'div',
    },
  },
  setup(props, { slots }) {
    const api = useDialogContext(DIALOG_CONTEXT, DialogOverlay)

    const { close } = api as { close: any }

    return () => {
      return h(props.as, { onClick: close }, slots)
    }
  },
})

export const DialogPanel = defineComponent({
  name: '$dialogPanel',
  props: {
    as: {
      type: String,
      default: 'div',
    },
  },
  setup(props, { slots, attrs }) {
    const cargo = useDialogContext(DIALOG_CONTEXT, DialogPanel)

    return () => {
      return h(props.as, { ...attrs, cargo }, slots)
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
