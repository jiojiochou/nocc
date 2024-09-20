<script setup lang="ts">
import { defineOptions, ref } from 'vue'

defineOptions({
  name: 'NButton',
})

const tag = ref('button')
</script>

<template>
  <component :is="tag">
    <button>
      <slot />
    </button>
  </component>
</template>
