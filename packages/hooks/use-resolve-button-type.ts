import { onMounted, ref, type Ref } from 'vue'

function resolveType(type: unknown, as: string | object) {
  if (type)
    return type

  const tag = as ?? 'button'
  if (typeof tag === 'string' && tag.toLowerCase() === 'button')
    return 'button'

  return undefined
}

export function useResolveButtonType(
  data: Ref<{ as: string | object, type?: unknown }>,
) {
  const type = ref(resolveType(data.value.type, data.value.as))

  onMounted(() => {
    type.value = resolveType(data.value.type, data.value.as)
  })

  return type
}
