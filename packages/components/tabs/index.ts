import type { ComponentInternalInstance, InjectionKey, Ref } from 'vue'
import { render } from '@nosc/utils'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref,
  useId,
} from 'vue'

interface StateDefinition {
  selectedIndex: Ref<number | null>
  tabs: Ref<Ref<HTMLElement | ComponentInternalInstance | null>[]>
  panels: Ref<Ref<HTMLElement | ComponentInternalInstance | null>[]>
  setSelectedIndex: (indexToSet: number) => void
  registerTab: (tab: Ref<HTMLElement | ComponentInternalInstance | null>) => void
  unregisterTab: (tab: Ref<HTMLElement | ComponentInternalInstance | null>) => void
  registerPanel: (panel: Ref<HTMLElement | ComponentInternalInstance | null>) => void
  unregisterPanel: (panel: Ref<HTMLElement | ComponentInternalInstance | null>) => void
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
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, attrs, emit }) {
    const selectedIndex = ref(props.selectedIndex ?? props.defaultIndex)

    // tab组件实例列表
    const tabs = ref<Ref<HTMLElement | ComponentInternalInstance | null>[]>([])
    // panel组件实例列表
    const panels = ref<Ref<HTMLElement | ComponentInternalInstance | null>[]>([])

    const api = {
      selectedIndex: computed(() => selectedIndex.value ?? props.defaultIndex),
      tabs,
      panels,
      setSelectedIndex(indexToSet: number) {
        selectedIndex.value = indexToSet
        emit('change', indexToSet)
      },
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
      registerPanel(panel: typeof panels['value'][number]) {
        if (panels.value.includes(panel))
          return
        panels.value.push(panel)
      },
      unregisterPanel(panel: typeof panels['value'][number]) {
        const idx = panels.value.indexOf(panel)
        if (idx !== -1)
          panels.value.splice(idx, 1)
      },
    }

    provide(TabsContext, api)

    return () => {
      const slot = { selectedIndex: selectedIndex.value }

      return render({
        name: 'TabGroup',
        slot,
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

    const internalTabRef = ref<HTMLElement | ComponentInternalInstance | null>(getCurrentInstance())

    onMounted(() => api.registerTab(internalTabRef))
    onUnmounted(() => api.unregisterTab(internalTabRef))

    const internalIndex = computed(() => {
      const idx = api.tabs.value.indexOf(internalTabRef)
      if (idx === -1)
        return 0
      return idx
    })
    const selected = computed(() => internalIndex.value === api.selectedIndex.value)

    const handleClick = () => {
      if (props.disabled)
        return
      api.setSelectedIndex(internalIndex.value)
    }

    return () => {
      const slot = { selected: selected.value, disabled: props.disabled ?? false }
      const { id, ...theirProps } = props
      const ourProps = {
        id,
        'role': 'tab',
        'aria-selected': selected.value,
        'disabled': props.disabled,
        'onClick': handleClick,
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
    const api = useTabsContext('TabPanels')

    return () => {
      const slot = { selectedIndex: api.selectedIndex.value }
      return render({
        name: 'TabPanels',
        slot,
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
    id: { type: String, default: () => `nosc-tabs-panel-${useId()}` },
  },
  setup(props, { slots, attrs }) {
    const api = useTabsContext('TabPanel')

    const internalPanelRef = ref<HTMLElement | ComponentInternalInstance | null>(getCurrentInstance())

    onMounted(() => api.registerPanel(internalPanelRef))
    onUnmounted(() => api.unregisterPanel(internalPanelRef))

    const internalIndex = computed(() => {
      const idx = api.panels.value.indexOf(internalPanelRef)
      if (idx === -1)
        return 0
      return idx
    })
    const selected = computed(() => internalIndex.value === api.selectedIndex.value)

    return () => {
      const slot = { selected: selected.value }
      const ourProps = {
        role: 'tabpanel',
      }

      if (!selected.value) {
        return h('span', {
          hidden: true,
          style: {
            position: 'fixed',
            top: 1,
            left: 1,
            width: 1,
            height: 0,
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            borderWidth: '0',
          },
        })
      }

      return render({
        name: 'TabPanel',
        slot,
        slots,
        ourProps,
        theirProps: props,
        attrs,
      })
    }
  },
})
