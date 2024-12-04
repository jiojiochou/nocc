import { useResolveButtonType } from '@nosc/hooks'
import { render } from '@nosc/utils'
import { computed, defineComponent, h } from 'vue'

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
  setup(props, { slots }) {
    return () => {
      return h(props.as, { }, slots.default?.())
    }
  },
})

export const TabList = defineComponent({
  name: 'TabList',
  props: {
    as: { type: [Object, String], default: 'div' },
  },
  setup(props, { slots }) {
    return () => {
      return h(props.as, { role: 'tabList' }, slots.default?.())
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
    const type = useResolveButtonType(
      computed(() => ({ as: props.as, type: attrs.type })),
    )

    return () => {
      return render({
        name: 'Tab',
        props,
        slots,
        attrs,
        type: type.value,
      })
    }
  },
})

export const TabPanels = defineComponent({
  name: 'TabPanels',
  props: {
    as: { type: [Object, String], default: 'div' },
  },
  setup(props, { slots }) {
    return () => {
      return h(props.as, { }, slots.default?.())
    }
  },
})

export const TabPanel = defineComponent({
  name: 'TabPanel',
  props: {
    as: { type: [Object, String], default: 'div' },
  },
  setup(props, { slots }) {
    return () => {
      return h(props.as, { }, slots.default?.())
    }
  },
})
