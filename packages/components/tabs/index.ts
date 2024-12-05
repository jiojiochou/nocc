import { render } from '@nosc/utils'
import { computed, defineComponent, inject, onMounted, provide, ref, type Ref } from 'vue'

const TabsContext = Symbol('TabsContext')

function useTabsContext(component: string): any {
  const context = inject(TabsContext, null)

  if (context === null) {
    const err = new Error(`<${component} /> is missing a parent <TabGroup /> component.`)
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, useTabsContext)

    throw err
  }

  return context
}

export const TabGroup = defineComponent({
  name: 'TabGroup',
  props: {
    as: { type: [Object, String], default: 'div' },
    selectedIndex: { type: Number, default: null },
    defaultIndex: { type: Number, default: 0 },
    vertical: { type: Boolean, default: false },
    manual: { type: Boolean, default: false },
    modelValue: { type: [String, Number], default: null },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, attrs }) {
    const selectedIndex = ref(props.selectedIndex ?? props.defaultIndex)

    // tabs Node
    const tabs = ref<Ref<HTMLElement | null>[]>([])

    const api = {
      selectedIndex: computed(() => selectedIndex.value ?? props.defaultIndex),
      tabs,
      registerTab(tab: typeof tabs['value'][number]) {
        if (tabs.value.includes(tab))
          return

        tabs.value.push(tab)
      },
    }

    provide(TabsContext, api)

    return () => {
      return render({
        name: 'TabGroup',
        props,
        slots,
        attrs,
      })
    }
  },
})

export const TabList = defineComponent({
  name: 'TabList',
  props: {
    as: { type: [Object, String], default: 'div' },
  },
  setup(props, { slots, attrs }) {
    // const ComContext = useTabsContext('TabList')

    return () => {
      return render({
        name: 'TabList',
        props,
        slots,
        attrs,
      })
    }
  },
})

export const Tab = defineComponent({
  name: 'Tab',
  props: {
    as: { type: [Object, String], default: 'button' },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    const api = useTabsContext('Tab')

    const internalTabRef = ref<HTMLElement | null>(null)

    onMounted(() => api.registerTab(internalTabRef))

    return () => {
      return render({
        name: 'Tab',
        props,
        slots,
        attrs,
      })
    }
  },
})

export const TabPanels = defineComponent({
  name: 'TabPanels',
  props: {
    as: { type: [Object, String], default: 'div' },
  },
  setup(props, { slots, attrs }) {
    return () => {
      return render({
        name: 'TabPanels',
        props,
        slots,
        attrs,
      })
    }
  },
})

export const TabPanel = defineComponent({
  name: 'TabPanel',
  props: {
    as: { type: [Object, String], default: 'div' },
  },
  setup(props, { slots, attrs }) {
    return () => {
      return render({
        name: 'TabPanel',
        props,
        slots,
        attrs,
      })
    }
  },
})
