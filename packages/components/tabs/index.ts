import { render } from '@nosc/utils'
import { defineComponent } from 'vue'

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
    return () => {
      // h(props.as, { role: 'tablist' }, slots.default?.())
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
