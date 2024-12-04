import { useResolveButtonType } from '@nosc/hooks'
import { computed, defineComponent, Fragment, h } from 'vue'

export const TabGroup = defineComponent({
  name: 'TabGroup',
  props: {
    as: { type: [Object, String], default: 'div' },
  },
  setup(props, { slots }) {
    return () => {
      return h(props.as, { role: 'tabGroup' }, slots.default?.())
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
      return h(Fragment, {
        'role': 'tab',
        'disabled': props.disabled ? true : undefined,
        'aria-disabled': props.disabled,
        'type': type.value,
      }, slots.default?.())
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
