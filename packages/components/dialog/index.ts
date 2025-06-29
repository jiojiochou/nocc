import type { InjectionKey } from 'vue'
import { defineComponent, h, inject, provide, Teleport, useId, watchPostEffect } from 'vue'

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
  name: 'Dialog',
  props: {
    id: { type: String, default: () => `dialog-id-${useId()}` },
    as: { type: String, default: 'div' },
    open: { type: Boolean, default: false },
    class: { type: String, default: '' },
    appendTo: { type: String, default: 'body' },
  },
  emits: ['update:open', 'closed'],
  setup(props, { attrs, slots, emit }) {
    const handleKeydownExit = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        emit('update:open', false)
      }
    }

    // watchEffect在组件没有渲染前运行
    watchPostEffect(() => {
      const dialogElement = document.querySelector(`#${props.id}`) as HTMLElement | null

      if (props.open && dialogElement) {
        dialogElement.focus()
        dialogElement.addEventListener('keydown', handleKeydownExit)
      }
      else if (dialogElement) {
        dialogElement.removeEventListener('keydown', handleKeydownExit)
      }
    })

    // 方法一
    let firstOpen = 0
    watchPostEffect(() => {
      if (!props.open && firstOpen++ >= 1) {
        firstOpen = 1
        emit('closed')
      }
    })

    // 方法二
    // watch(() => props.open, (val) => {
    //   if (!val)
    //     emit('closed')
    // })

    provide(DIALOG_CONTEXT, {
      close: () => emit('update:open', false),
    })

    // render函数 === <template />
    return () => {
      return h(Teleport, { to: props.appendTo }, h(
        props.as,
        {
          ...attrs,
          'id': props.id,
          'class': props.class,
          'hidden': !props.open,
          'tabindex': '0',
          'role': 'dialog',

          'aria-modal': '',
          'aria-label': '', // warning | error
          'aria-labelledby': '',
          'aria-describedby': '',
        },
        slots,
      ))
    }
  },
})

export const DialogOverlay = defineComponent({
  name: 'DialogOverlay',
  props: {
    as: {
      type: String,
      default: 'div',
    },
  },
  setup(props, { slots }) {
    const api = useDialogContext('DialogOverlay')

    function handleClick(event: MouseEvent) {
      // 点击事件发生的元素: event.target, 点击事件绑定的元素: event.currentTarget
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
  name: 'DialogPanel',
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
  name: 'DialogTitle',
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
