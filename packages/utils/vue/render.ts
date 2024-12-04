import { Fragment, h, type VNode } from 'vue'

function flattenFragments(children: VNode[]): VNode[] {
  return children.flatMap((child) => {
    if (child.type === Fragment) {
      return flattenFragments(child.children as VNode[])
    }

    return [child]
  })
}

export function render({ as, slots, props, ...main }: any) {
  let children = slots.default?.()

  if (as === 'template') {
    children = flattenFragments(children)
    return children
  }

  return h(as, {
    'role': 'tab',
    'disabled': props.disabled ? true : undefined,
    'aria-disabled': props.disabled,
    'type': main.type,
  }, {
    default: () => children,
  })
}
