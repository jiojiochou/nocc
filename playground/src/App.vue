<script setup lang="ts">
import { Dialog } from '@nosc/components'

</script>

<template>
  <div
    class="w-100vw h-100vh flex flex-col items-center place-content-center bg-gradient-to-r from-sky-400 to-blue-600">
    <button class="rounded-md
      bg-black/20 px-4 py-2 text-sm font-medium text-white
      hover:bg-black/30 focus:outline-none focus-visible:ring-2
      focus-visible:ring-white/75 cursor-pointer">
      编辑
    </button>
    <Dialog class="relative z-10" />
  </div>
</template>
