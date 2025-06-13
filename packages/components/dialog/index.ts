import type { InjectionKey } from 'vue'
import { defineComponent, h, inject, provide, watch } from 'vue'

interface DialogContext {
  close: () => void
}

const DIALOG_CONTEXT = Symbol('DIALOG_CONTEXT') as InjectionKey<DialogContext>

function useDialogContext(component: string) {
  const context = inject(DIALOG_CONTEXT, null)
  if (context === null) {
    const err = new Error(`<${component} /> is missing a parent <Dialog /> component.`)
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, useDialogContext)
    throw err
  }
  return context
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
    const handleKeydownExit = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        emit('update:open', false)
      }
    }

    watch(() => props.open, (val: boolean) => {
      if (val) {
        document.addEventListener('keydown', handleKeydownExit)
      }
      else {
        document.removeEventListener('keydown', handleKeydownExit)
      }
    })

    provide(DIALOG_CONTEXT, {
      close: () => emit('update:open', false),
    })

    // render函数 === <template />
    return () => {
      return props.open
        ? h(
            props.as,
            {
              'hidden': !props.open,
              ...attrs,
              'role': 'dialog',
              'aria-modal': true,
              'aria-label': '', // warning | error
            },
            slots,
          )
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
    const api = useDialogContext('$dialogOverlay')

    function handleClick(event: MouseEvent) {
      if (event.target !== event.currentTarget)
        return
      event.preventDefault()
      event.stopPropagation()
      api.close()
    }

    return () => {
      return h(
        props.as,
        {
          'aria-hidden': true,
          'onClick': handleClick,
        },
        slots,
      )
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
    // const api = useDialogContext(DIALOG_CONTEXT, DialogPanel)
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
