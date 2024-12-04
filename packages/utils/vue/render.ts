import { h } from 'vue'

export function render(
  { props, slots, attrs, name, type }:
  { props: Record<string, any>, slots: Record<string, any>, attrs: Record<string, any>, name: string, type: Record<string, any> | undefined },
) {
  const { as } = props
  const children = slots.default?.()

  if (as === 'template') {
    return children
  }

  return h(as, {
    ...attrs,
    'role': name.toLowerCase(),
    'disabled': props.disabled ? true : undefined,
    'aria-disabled': props.disabled,
    type,
  }, {
    default: () => children,
  })
}
