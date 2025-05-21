import { ref } from 'vue'

export function useDialog() {
  // isOpen
  const isOpen = ref(false)
  // loading
  const loading = ref(false)

  const open = () => {}
  const close = () => {}

  return {
    isOpen,
    loading,
    open,
    close,
  }
}
