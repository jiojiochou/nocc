import { render } from '@nosc/utils'
import { computed, defineComponent, inject, type InjectionKey, onMounted, onUnmounted, provide, ref, type Ref, useId } from 'vue'

interface StateDefinition {
  selectedIndex: Ref<number | null>
  tabs: Ref<Ref<HTMLElement | null>[]>
  registerTab: (tab: Ref<HTMLElement | null>) => void
  unregisterTab: (tab: Ref<HTMLElement | null>) => void
}

const TabsContext = Symbol('TabsContext') as InjectionKey<StateDefinition>

function useTabsContext(component: string) {
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
      unregisterTab(tab: typeof tabs['value'][number]) {
        const item = tabs.value.findIndex(t => t === tab)
        if (item !== -1)
          tabs.value.splice(item, 1)
      },
    }

    provide(TabsContext, api)

    return () => {
      return render({
        name: 'TabGroup',
        slots,
        theirProps: props,
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
        slots,
        theirProps: props,
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
    id: { type: String, default: () => `nosc-tabs-tab-${useId()}` },
  },
  setup(props, { slots, attrs }) {
    const api = useTabsContext('Tab')

    const internalTabRef = ref<HTMLElement | null>(null)

    onMounted(() => api.registerTab(internalTabRef))
    onUnmounted(() => api.unregisterTab(internalTabRef))

    const internalIndex = computed(() => {
      const idx = api.tabs.value.indexOf(internalTabRef)
      if (idx === -1)
        return 0
      return idx
    })
    const selected = computed(() => internalIndex.value === api.selectedIndex.value)

    return () => {
      const slot = { selected: selected.value, disabled: props.disabled ?? false }
      const { id, ...theirProps } = props
      const ourProps = {
        id,
        'role': 'tab',
        'aria-selected': selected.value,
        'disabled': props.disabled,
      }
      return render({
        name: 'Tab',
        ourProps,
        theirProps,
        slot,
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
        slots,
        theirProps: props,
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
        slots,
        theirProps: props,
        attrs,
      })
    }
  },
})
