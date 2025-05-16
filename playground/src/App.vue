<script setup lang="ts">
import { Dialog } from '@nosc/components'
import { ref } from 'vue';

const visibility = ref(false)
const visibilityClick = () => {
  visibility.value = !visibility.value
}

</script>

<template>
  <div
    class="w-100vw h-100vh flex flex-col items-center place-content-center bg-gradient-to-r from-sky-400 to-blue-600">
    <button class="rounded-md
      bg-black/20 px-4 py-2 text-sm font-medium text-white
      hover:bg-black/30 focus:outline-none focus-visible:ring-2
      focus-visible:ring-white/75 cursor-pointer" @click="visibilityClick">
      编辑
    </button>
    <Dialog :open="visibility" class="absolute z-10 bg-white rounded-2xl w-100 h-50 text-center of-hidden">
      <div class="h-5 bg-blue/50"></div>
      <div></div>
      <div class="inline-flex justify-center rounded-md
        border border-transparent bg-blue-100 px-4 py-2
        text-sm font-medium text-blue-900 hover:bg-blue-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        focus-visible:ring-offset-2 cursor-pointer">
        确认
      </div>
    </Dialog>
  </div>
</template>
