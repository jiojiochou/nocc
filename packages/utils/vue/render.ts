import { h, type Slots } from 'vue'

export function render(
  { ourProps, theirProps, ...main }: {
    ourProps?: Record<string, any>
    theirProps: Record<string, any>
    slot?: Record<string, any>
    attrs: Record<string, any>
    slots: Slots
    name: string
  },
) {
  const { as } = theirProps
  const children = main.slots.default?.(main.slot)

  if (as === 'template') {
    return children
  }

  return h(as, Object.assign({}), {
    default: () => children,
  })
}
