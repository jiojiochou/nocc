<script setup lang="ts">
import { $dialog } from '@nosc/components'

</script>

<template>
  <div
    class="w-100vw h-100vh flex flex-col items-center place-content-center bg-gradient-to-r from-sky-400 to-blue-600">
    <button
      class="px-3 py-1 rounded-0.5 cursor-pointer active:outline active:outline-green active:outline-2">编辑</button>
    <component :is="$dialog" class="w-100 h-100 bg-red"> </component>
  </div>
</template>
