<script setup lang="ts">
import { defineOptions } from 'vue'

defineOptions({
  name: 'NButton',
})
</script>

<template>
  <component :is="tag">
    <button>
      <slot />
    </button>
  </component>
</template>
